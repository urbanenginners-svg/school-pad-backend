import { resource } from "src/utils/constants/resource";
import { PermissionEnum } from "src/utils/enums/permission.enum";

export const roles = [
    {
        name: 'Super Admin',
        description: ' Super Admin role with all permissions',
        permissions: [
            `${resource.Me}:${PermissionEnum.WRITE}`,
            `${resource.Me}:${PermissionEnum.READ}`,
            `${resource.Me}:${PermissionEnum.DELETE}`,
            `${resource.Me}:${PermissionEnum.UPDATE}`,
            `${resource.Institution}:${PermissionEnum.WRITE}`,
            `${resource.Institution}:${PermissionEnum.READ}`,
            `${resource.Institution}:${PermissionEnum.UPDATE}`,
            `${resource.Institution}:${PermissionEnum.DELETE}`
        ]
    },
    {
        name: 'Institution Admin',
        description: 'Administrator role for managing a specific institution',
        permissions: [
            `${resource.Me}:${PermissionEnum.READ}`,
            `${resource.Me}:${PermissionEnum.UPDATE}`,
        ]
    }
]