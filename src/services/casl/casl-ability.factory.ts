import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Permission } from "../mongoose/schemas/permission.schema";
import { Role } from "../mongoose/schemas/role.schema";
import { Model } from "mongoose";
import { User } from "../mongoose/schemas/user.schema";
import { AppAbility } from "./types";
import { PermissionEnum } from "src/utils/enums/permission.enum";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async createForUser(user: User): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    // Find the user's role with populated permissions
    const userRole = await this.roleModel
      //   .findById(user.role)
      .findById("")
      .populate("permissions")
      .exec();

    if (!userRole || !userRole.permissions) {
      return build() as AppAbility;
    }

    // Process each permission
    userRole.permissions.forEach((permission: any) => {
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
      can(action, permission.resource);
    });

    return build() as AppAbility;
  }

  // Helper method to check if user has specific permission
  async hasPermission(
    user: User,
    action: PermissionEnum,
    resource: string,
  ): Promise<boolean> {
    const ability = await this.createForUser(user);
    return ability.can(action, resource);
  }

  // Helper method to get all user permissions as strings
  async getUserPermissions(user: User): Promise<string[]> {
    const userRole = await this.roleModel
      //   .findById(user.role)
      .findById("")
      .populate("permissions")
      .exec();

    if (!userRole || !userRole.permissions) {
      return [];
    }

    return userRole.permissions.map((permission: any) => permission.slug);
  }
}
