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
import { InstitutionUser, InstitutionUserDocument } from "src/services/mongoose/schemas/institution-user.schema";
import { InstitutionRole, InstitutionRoleDocument } from "src/services/mongoose/schemas/institution-role.schema";
import { 
  CreateInstitutionDto, 
  UpdateInstitutionDto, 
  CreateInstitutionAdminDto,
  CreateInstitutionUserDto,
  UpdateInstitutionUserDto
} from "./dto";
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
    @InjectModel(InstitutionUser.name)
    private institutionUserModel: Model<InstitutionUserDocument>,
    @InjectModel(InstitutionRole.name)
    private institutionRoleModel: Model<InstitutionRoleDocument>,
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

    // Check if email already exists in system users
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

    // Find Institution Admin role (system-level role)
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

    // Create user in system users collection
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

  // Institution User Management Methods
  async createInstitutionUser(
    institutionId: string,
    createInstitutionUserDto: CreateInstitutionUserDto,
    createdByUserId?: string,
  ): Promise<InstitutionUserDocument> {
    // Verify institution exists and is active
    const institution = await this.findOne(institutionId);
    if (!institution.isActive) {
      throw new BadRequestException(
        `Cannot create user for inactive institution`,
      );
    }

    // Check if email already exists in institution users
    const existingUser = await this.institutionUserModel
      .findOne({ email: createInstitutionUserDto.email, deletedAt: null })
      .exec();

    if (existingUser) {
      throw new ConflictException(
        `Institution user with email ${createInstitutionUserDto.email} already exists`,
      );
    }

    // Check if phone number already exists (if provided)
    if (createInstitutionUserDto.phoneNumber) {
      const existingPhone = await this.institutionUserModel
        .findOne({
          phoneNumber: createInstitutionUserDto.phoneNumber,
          deletedAt: null,
        })
        .exec();

      if (existingPhone) {
        throw new ConflictException(
          `Institution user with phone number ${createInstitutionUserDto.phoneNumber} already exists`,
        );
      }
    }

    // Verify role exists and belongs to this institution
    const role = await this.institutionRoleModel
      .findOne({ _id: createInstitutionUserDto.roleId, institutionId, deletedAt: null })
      .exec();

    if (!role) {
      throw new NotFoundException(
        `Institution role not found or does not belong to this institution`,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      createInstitutionUserDto.password,
      10,
    );

    // Create institution user
    const userData = {
      firstName: createInstitutionUserDto.firstName,
      lastName: createInstitutionUserDto.lastName,
      email: createInstitutionUserDto.email,
      phoneNumber: createInstitutionUserDto.phoneNumber,
      password: hashedPassword,
      institutionId: institutionId,
      role: [role._id],
      isActive: true,
      ...(createdByUserId && { createdBy: createdByUserId }),
    };

    const user = new this.institutionUserModel(userData);
    return user.save();
  }

  async findAllInstitutionUsers(
    institutionId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: InstitutionUserDocument[]; meta: any }> {
    // Verify institution exists
    await this.findOne(institutionId);

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.institutionUserModel,
      query,
      [
        {
          $match: { institutionId, deletedAt: null },
        },
      ],
    );
    return { data, meta };
  }

  async findOneInstitutionUser(
    institutionId: string,
    userId: string,
  ): Promise<InstitutionUserDocument> {
    const user = await this.institutionUserModel
      .findOne({ _id: userId, institutionId, deletedAt: null })
      .populate('role')
      .exec();

    if (!user) {
      throw new NotFoundException(
        `Institution user with ID ${userId} not found`,
      );
    }

    return user;
  }

  async updateInstitutionUser(
    institutionId: string,
    userId: string,
    updateInstitutionUserDto: UpdateInstitutionUserDto,
    updatedByUserId?: string,
  ): Promise<InstitutionUserDocument> {
    const user = await this.findOneInstitutionUser(institutionId, userId);

    // If role is being updated, verify it exists and belongs to this institution
    if (updateInstitutionUserDto.roleId) {
      const role = await this.institutionRoleModel
        .findOne({ _id: updateInstitutionUserDto.roleId, institutionId, deletedAt: null })
        .exec();

      if (!role) {
        throw new NotFoundException(
          `Institution role not found or does not belong to this institution`,
        );
      }
      
      user.role = [role._id] as any;
    }

    if (updateInstitutionUserDto.firstName) {
      user.firstName = updateInstitutionUserDto.firstName;
    }
    if (updateInstitutionUserDto.lastName) {
      user.lastName = updateInstitutionUserDto.lastName;
    }
    if (updateInstitutionUserDto.phoneNumber) {
      user.phoneNumber = updateInstitutionUserDto.phoneNumber;
    }
    if (updatedByUserId) {
      user.lastUpdatedBy = updatedByUserId;
    }

    return user.save();
  }

  async removeInstitutionUser(
    institutionId: string,
    userId: string,
    deletedByUserId?: string,
  ): Promise<InstitutionUserDocument> {
    const user = await this.findOneInstitutionUser(institutionId, userId);

    user.deletedAt = new Date();
    if (deletedByUserId) {
      user.deletedBy = deletedByUserId;
    }

    return user.save();
  }

  async activateInstitutionUser(
    institutionId: string,
    userId: string,
    updatedByUserId?: string,
  ): Promise<InstitutionUserDocument> {
    const user = await this.findOneInstitutionUser(institutionId, userId);

    if (user.isActive) {
      throw new BadRequestException(
        `Institution user with ID ${userId} is already active`,
      );
    }

    user.isActive = true;
    if (updatedByUserId) {
      user.lastUpdatedBy = updatedByUserId;
    }

    return user.save();
  }

  async deactivateInstitutionUser(
    institutionId: string,
    userId: string,
    updatedByUserId?: string,
  ): Promise<InstitutionUserDocument> {
    const user = await this.findOneInstitutionUser(institutionId, userId);

    if (!user.isActive) {
      throw new BadRequestException(
        `Institution user with ID ${userId} is already inactive`,
      );
    }

    user.isActive = false;
    if (updatedByUserId) {
      user.lastUpdatedBy = updatedByUserId;
    }

    return user.save();
  }
}
