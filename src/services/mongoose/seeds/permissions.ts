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
    }
]