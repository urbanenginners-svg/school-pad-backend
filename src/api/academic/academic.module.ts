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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcademicProgram.name, schema: AcademicProgramSchema },
      { name: AcademicClass.name, schema: AcademicClassSchema },
      { name: Section.name, schema: SectionSchema },
      { name: StudentEnrollment.name, schema: StudentEnrollmentSchema },
      { name: Institution.name, schema: InstitutionSchema },
      { name: InstitutionUser.name, schema: InstitutionUserSchema },
    ]),
  ],
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService],
})
export class AcademicModule {}
