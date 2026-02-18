import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { InstitutionRole, InstitutionRoleSchema } from "src/services/mongoose/schemas/institution-role.schema";
import { Institution, InstitutionSchema } from "src/services/mongoose/schemas/institution.schema";
import { InstitutionUser, InstitutionUserSchema } from "src/services/mongoose/schemas/institution-user.schema";
import { Permission, PermissionSchema } from "src/services/mongoose/schemas/permission.schema";
import { InstitutionAbilityFactory } from "src/services/casl/institution-ability.factory";
import { InstitutionPoliciesGuard } from "src/services/casl/institution-policies.guard";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: InstitutionRole.name, schema: InstitutionRoleSchema },
            { name: Institution.name, schema: InstitutionSchema },
            { name: InstitutionUser.name, schema: InstitutionUserSchema },
            { name: Permission.name, schema: PermissionSchema },
        ]),
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        InstitutionAbilityFactory,
        InstitutionPoliciesGuard
    ],
    exports: [RoleService]
})
export class RoleModule {}