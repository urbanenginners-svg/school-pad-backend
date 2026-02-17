import { resource } from "src/utils/constants/resource";
import { PermissionEnum } from "src/utils/enums/permission.enum";

export const permissions = [
    {
        action: PermissionEnum.WRITE,
        resource: resource.Me,
        slug: `${resource.Me}:${PermissionEnum.WRITE}`
    },
    {
        action: PermissionEnum.READ,
        resource: resource.Me,
        slug: `${resource.Me}:${PermissionEnum.READ}`
    },
    {
        action: PermissionEnum.DELETE,
        resource: resource.Me,
        slug: `${resource.Me}:${PermissionEnum.DELETE}`
    },
    {
        action: PermissionEnum.UPDATE,
        resource: resource.Me,
        slug: `${resource.Me}:${PermissionEnum.UPDATE}`
    },
    {
        action: PermissionEnum.WRITE,
        resource: resource.Institution,
        slug: `${resource.Institution}:${PermissionEnum.WRITE}`
    },
    {
        action: PermissionEnum.READ,
        resource: resource.Institution,
        slug: `${resource.Institution}:${PermissionEnum.READ}`
    },
    {
        action: PermissionEnum.UPDATE,
        resource: resource.Institution,
        slug: `${resource.Institution}:${PermissionEnum.UPDATE}`
    },
    {
        action: PermissionEnum.DELETE,
        resource: resource.Institution,
        slug: `${resource.Institution}:${PermissionEnum.DELETE}`
    }
]