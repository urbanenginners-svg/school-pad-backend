import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  InstitutionRole,
  InstitutionRoleDocument,
} from "src/services/mongoose/schemas/institution-role.schema";
import {
  Institution,
  InstitutionDocument,
} from "src/services/mongoose/schemas/institution.schema";
import {
  InstitutionUser,
  InstitutionUserDocument,
} from "src/services/mongoose/schemas/institution-user.schema";
import {
  CreateInstitutionRoleDto,
  UpdateInstitutionRoleDto,
} from "./dto";
import { CommonFieldsDto } from "src/utils/dtos/common-fields.dto";
import { getPaginatedDataWithAggregation } from "src/utils/services/get-paginated-data-aggregation.service";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(InstitutionRole.name)
    private institutionRoleModel: Model<InstitutionRoleDocument>,
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
    @InjectModel(InstitutionUser.name)
    private institutionUserModel: Model<InstitutionUserDocument>,
  ) {}

  async createInstitutionRole(
    institutionId: string,
    createInstitutionRoleDto: CreateInstitutionRoleDto,
    createdByUserId?: string,
  ): Promise<InstitutionRoleDocument> {
    // Verify institution exists and is active
    const institution = await this.institutionModel
      .findOne({ _id: institutionId, deletedAt: null })
      .exec();

    if (!institution) {
      throw new NotFoundException(
        `Institution with ID ${institutionId} not found`,
      );
    }

    if (!institution.isActive) {
      throw new BadRequestException(
        `Cannot create role for inactive institution`,
      );
    }

    // Check if role name already exists for this institution
    const existingRole = await this.institutionRoleModel
      .findOne({
        name: createInstitutionRoleDto.name,
        institutionId,
        deletedAt: null,
      })
      .exec();

    if (existingRole) {
      throw new ConflictException(
        `Role with name ${createInstitutionRoleDto.name} already exists for this institution`,
      );
    }

    // Create institution role
    const roleData = {
      name: createInstitutionRoleDto.name,
      description: createInstitutionRoleDto.description,
      institutionId: institutionId,
      permissions: createInstitutionRoleDto.permissions || [],
      isActive: true,
      ...(createdByUserId && { createdBy: createdByUserId }),
    };

    const role = new this.institutionRoleModel(roleData);
    return role.save();
  }

  async findAllInstitutionRoles(
    institutionId: string,
    query: CommonFieldsDto,
  ): Promise<{ data: InstitutionRoleDocument[]; meta: any }> {
    // Verify institution exists
    const institution = await this.institutionModel
      .findOne({ _id: institutionId, deletedAt: null })
      .exec();

    if (!institution) {
      throw new NotFoundException(
        `Institution with ID ${institutionId} not found`,
      );
    }

    const [data, meta] = await getPaginatedDataWithAggregation(
      this.institutionRoleModel,
      query,
      [
        {
          $match: { institutionId, deletedAt: null },
        },
      ],
    );
    return { data, meta };
  }

  async findOneInstitutionRole(
    institutionId: string,
    roleId: string,
  ): Promise<InstitutionRoleDocument> {
    const role = await this.institutionRoleModel
      .findOne({ _id: roleId, institutionId, deletedAt: null })
      .populate("permissions")
      .exec();

    if (!role) {
      throw new NotFoundException(
        `Institution role with ID ${roleId} not found or does not belong to this institution`,
      );
    }

    return role;
  }

  async updateInstitutionRole(
    institutionId: string,
    roleId: string,
    updateInstitutionRoleDto: UpdateInstitutionRoleDto,
    updatedByUserId?: string,
  ): Promise<InstitutionRoleDocument> {
    const role = await this.findOneInstitutionRole(institutionId, roleId);

    // Check if new name conflicts with existing role
    if (
      updateInstitutionRoleDto.name &&
      updateInstitutionRoleDto.name !== role.name
    ) {
      const existingRole = await this.institutionRoleModel
        .findOne({
          name: updateInstitutionRoleDto.name,
          institutionId,
          deletedAt: null,
          _id: { $ne: roleId },
        })
        .exec();

      if (existingRole) {
        throw new ConflictException(
          `Role with name ${updateInstitutionRoleDto.name} already exists for this institution`,
        );
      }
    }

    const updateData = {
      ...updateInstitutionRoleDto,
      ...(updatedByUserId && { lastUpdatedBy: updatedByUserId }),
    };

    Object.assign(role, updateData);
    return role.save();
  }

  async removeInstitutionRole(
    institutionId: string,
    roleId: string,
    deletedByUserId?: string,
  ): Promise<InstitutionRoleDocument> {
    const role = await this.findOneInstitutionRole(institutionId, roleId);

    // Check if any users are assigned to this role
    const usersWithRole = await this.institutionUserModel
      .findOne({
        role: { $in: [roleId] },
        institutionId,
        deletedAt: null,
      })
      .exec();

    if (usersWithRole) {
      throw new BadRequestException(
        `Cannot delete role with ID ${roleId} as it is assigned to users`,
      );
    }

    role.deletedAt = new Date();
    if (deletedByUserId) {
      role.deletedBy = deletedByUserId;
    }

    return role.save();
  }

  async activateInstitutionRole(
    institutionId: string,
    roleId: string,
    updatedByUserId?: string,
  ): Promise<InstitutionRoleDocument> {
    const role = await this.findOneInstitutionRole(institutionId, roleId);

    if (role.isActive) {
      throw new BadRequestException(
        `Institution role with ID ${roleId} is already active`,
      );
    }

    role.isActive = true;
    if (updatedByUserId) {
      role.lastUpdatedBy = updatedByUserId;
    }

    return role.save();
  }

  async deactivateInstitutionRole(
    institutionId: string,
    roleId: string,
    updatedByUserId?: string,
  ): Promise<InstitutionRoleDocument> {
    const role = await this.findOneInstitutionRole(institutionId, roleId);

    if (!role.isActive) {
      throw new BadRequestException(
        `Institution role with ID ${roleId} is already inactive`,
      );
    }

    role.isActive = false;
    if (updatedByUserId) {
      role.lastUpdatedBy = updatedByUserId;
    }

    return role.save();
  }
}
