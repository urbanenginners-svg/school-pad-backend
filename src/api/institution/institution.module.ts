import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { Institution, InstitutionSchema } from 'src/services/mongoose/schemas/institution.schema';
import { User, UserSchema } from 'src/services/mongoose/schemas/user.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { InstitutionUser, InstitutionUserSchema } from 'src/services/mongoose/schemas/institution-user.schema';
import { InstitutionRole, InstitutionRoleSchema } from 'src/services/mongoose/schemas/institution-role.schema';
import { Permission, PermissionSchema } from 'src/services/mongoose/schemas/permission.schema';
import { InstitutionAbilityFactory } from 'src/services/casl/institution-ability.factory';
import { InstitutionPoliciesGuard } from 'src/services/casl/institution-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: InstitutionUser.name, schema: InstitutionUserSchema },
      { name: InstitutionRole.name, schema: InstitutionRoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService, InstitutionAbilityFactory, InstitutionPoliciesGuard],
  exports: [InstitutionService, InstitutionAbilityFactory],
})
export class InstitutionModule {}
