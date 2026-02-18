import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Permission } from "../mongoose/schemas/permission.schema";
import { InstitutionRole } from "../mongoose/schemas/institution-role.schema";
import { Model } from "mongoose";
import { InstitutionUser } from "../mongoose/schemas/institution-user.schema";
import { AppAbility } from "./types";
import { PermissionEnum } from "src/utils/enums/permission.enum";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

@Injectable()
export class InstitutionAbilityFactory {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
    @InjectModel(InstitutionRole.name) private institutionRoleModel: Model<InstitutionRole>,
  ) {}

  async createForInstitutionUser(user: InstitutionUser): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    if (!user.role || user.role.length === 0) {
      return build() as AppAbility;
    }

    // Find all roles for the user with populated permissions
    const roles = await this.institutionRoleModel
      .find({ _id: { $in: user.role }, deletedAt: null })
      .populate("permissions")
      .exec();

    if (!roles || roles.length === 0) {
      return build() as AppAbility;
    }

    // Process each role's permissions
    roles.forEach((role) => {
      if (role.permissions) {
        role.permissions.forEach((permission: any) => {
          // Map PermissionEnum to Action enum
          let action: PermissionEnum;
          switch (permission.action) {
            case PermissionEnum.READ:
              action = PermissionEnum.READ;
              break;
            case PermissionEnum.WRITE:
              action = PermissionEnum.WRITE;
              break;
            case PermissionEnum.UPDATE:
              action = PermissionEnum.UPDATE;
              break;
            case PermissionEnum.DELETE:
              action = PermissionEnum.DELETE;
              break;
            default:
              return; // Skip unknown actions
          }

          // Grant the permission for the resource
          // Add institutionId condition to ensure user can only access their institution's data
          can(action, permission.resource, { institutionId: user.institutionId });
        });
      }
    });

    return build() as AppAbility;
  }

  // Helper method to check if institution user has specific permission
  async hasPermission(
    user: InstitutionUser,
    action: PermissionEnum,
    resource: string,
  ): Promise<boolean> {
    const ability = await this.createForInstitutionUser(user);
    return ability.can(action, resource);
  }

  // Helper method to get all institution user permissions as strings
  async getUserPermissions(user: InstitutionUser): Promise<string[]> {
    const roles = await this.institutionRoleModel
      .find({ _id: { $in: user.role }, deletedAt: null })
      .populate("permissions")
      .exec();

    if (!roles || roles.length === 0) {
      return [];
    }

    const permissions: string[] = [];
    roles.forEach((role) => {
      if (role.permissions) {
        role.permissions.forEach((permission: any) => {
          if (permission.slug && !permissions.includes(permission.slug)) {
            permissions.push(permission.slug);
          }
        });
      }
    });

    return permissions;
  }
}
