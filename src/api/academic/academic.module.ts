import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AcademicController } from './academic.controller';
import { AcademicService } from './academic.service';
import {
  AcademicProgram,
  AcademicProgramSchema,
} from 'src/services/mongoose/schemas/academic-program.schema';
import {
  AcademicClass,
  AcademicClassSchema,
} from 'src/services/mongoose/schemas/academic-class.schema';
import {
  Section,
  SectionSchema,
} from 'src/services/mongoose/schemas/section.schema';
import {
  StudentEnrollment,
  StudentEnrollmentSchema,
} from 'src/services/mongoose/schemas/student-enrollment.schema';
import {
  Institution,
  InstitutionSchema,
} from 'src/services/mongoose/schemas/institution.schema';
import {
  InstitutionUser,
  InstitutionUserSchema,
} from 'src/services/mongoose/schemas/institution-user.schema';
import {
  Permission,
  PermissionSchema,
} from 'src/services/mongoose/schemas/permission.schema';
import { Role, RoleSchema } from 'src/services/mongoose/schemas/role.schema';
import { CaslAbilityFactory } from 'src/services/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcademicProgram.name, schema: AcademicProgramSchema },
      { name: AcademicClass.name, schema: AcademicClassSchema },
      { name: Section.name, schema: SectionSchema },
      { name: StudentEnrollment.name, schema: StudentEnrollmentSchema },
      { name: Institution.name, schema: InstitutionSchema },
      { name: InstitutionUser.name, schema: InstitutionUserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [AcademicController],
  providers: [AcademicService, CaslAbilityFactory, PoliciesGuard],
  exports: [AcademicService],
})
export class AcademicModule {}
