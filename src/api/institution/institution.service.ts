import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import {
  Institution,
  InstitutionDocument,
} from "src/services/mongoose/schemas/institution.schema";
import { User } from "src/services/mongoose/schemas/user.schema";
import { Role } from "src/services/mongoose/schemas/role.schema";
import { CreateInstitutionDto, UpdateInstitutionDto, CreateInstitutionAdminDto } from "./dto";
import { CommonFieldsDto } from "src/utils/dtos/common-fields.dto";
import { getPaginatedDataWithAggregation } from "src/utils/services/get-paginated-data-aggregation.service";

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Role.name)
    private roleModel: Model<Role>,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
    userId?: string,
  ): Promise<Institution> {
    const institutionData = {
      ...createInstitutionDto,
      isActive: true,
      ...(userId && { createdBy: userId }),
    };

    const institution = new this.institutionModel(institutionData);
    return institution.save();
  }

  async findAll(
    query: CommonFieldsDto,
  ): Promise<{ data: InstitutionDocument[]; meta: any }> {
    const [data, meta] = await getPaginatedDataWithAggregation(
      this.institutionModel,
      query,
      [],
    );
    return { data, meta };
  }

  async findOne(id: string): Promise<InstitutionDocument> {
    const institution = await this.institutionModel
      .findOne({ _id: id, deletedAt: null })
      .exec();

    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }

    return institution;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
    userId?: string,
  ): Promise<Institution> {
    const institution = await this.findOne(id);

    const updateData = {
      ...updateInstitutionDto,
      ...(userId && { lastUpdatedBy: userId }),
    };

    Object.assign(institution, updateData);
    return institution.save();
  }

  async remove(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    institution.deletedAt = new Date();
    if (userId) {
      institution.deletedBy = userId;
    }

    return institution.save();
  }

  async activate(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    if (institution.isActive) {
      throw new BadRequestException(
        `Institution with ID ${id} is already active`,
      );
    }

    institution.isActive = true;
    if (userId) {
      institution.lastUpdatedBy = userId;
    }

    return institution.save();
  }

  async deactivate(id: string, userId?: string): Promise<Institution> {
    const institution = await this.findOne(id);

    if (!institution.isActive) {
      throw new BadRequestException(
        `Institution with ID ${id} is already inactive`,
      );
    }

    institution.isActive = false;
    if (userId) {
      institution.lastUpdatedBy = userId;
    }

    return institution.save();
  }

  async createInstitutionAdmin(
    institutionId: string,
    createInstitutionAdminDto: CreateInstitutionAdminDto,
    createdByUserId?: string,
  ): Promise<User> {
    // Verify institution exists and is active
    const institution = await this.findOne(institutionId);
    if (!institution.isActive) {
      throw new BadRequestException(
        `Cannot create admin for inactive institution`,
      );
    }

    // Check if email already exists
    const existingUser = await this.userModel
      .findOne({ email: createInstitutionAdminDto.email, deletedAt: null })
      .exec();

    if (existingUser) {
      throw new ConflictException(
        `User with email ${createInstitutionAdminDto.email} already exists`,
      );
    }

    // Check if phone number already exists (if provided)
    if (createInstitutionAdminDto.phoneNumber) {
      const existingPhone = await this.userModel
        .findOne({
          phoneNumber: createInstitutionAdminDto.phoneNumber,
          deletedAt: null,
        })
        .exec();

      if (existingPhone) {
        throw new ConflictException(
          `User with phone number ${createInstitutionAdminDto.phoneNumber} already exists`,
        );
      }
    }

    // Find Institution Admin role
    const institutionAdminRole = await this.roleModel
      .findOne({ name: "Institution Admin" })
      .exec();

    if (!institutionAdminRole) {
      throw new NotFoundException(
        `Institution Admin role not found. Please run seeder first.`,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      createInstitutionAdminDto.password,
      10,
    );

    // Create user
    const userData = {
      firstName: createInstitutionAdminDto.firstName,
      lastName: createInstitutionAdminDto.lastName,
      email: createInstitutionAdminDto.email,
      phoneNumber: createInstitutionAdminDto.phoneNumber,
      password: hashedPassword,
      institutionId: institutionId,
      role: [institutionAdminRole._id],
      isActive: true,
      ...(createdByUserId && { createdBy: createdByUserId }),
    };

    const user = new this.userModel(userData);
    return user.save();
  }
}
