import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import commonFieldsPlugin from '../plugins/common-fields';

export type StudentEnrollmentDocument = StudentEnrollment & Document;

@Schema({ collection: 'student-enrollments' })
export class StudentEnrollment {
  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  _id?: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    ref: 'InstitutionUser',
    index: true,
  })
  studentId: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    index: true,
  })
  institutionId: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    ref: 'AcademicClass',
    index: true,
  })
  classId: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
    ref: 'Section',
  })
  sectionId?: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  academicYear: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
  })
  createdBy?: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
  })
  lastUpdatedBy?: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
  })
  deletedBy?: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: Date,
  })
  deletedAt?: Date;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export const StudentEnrollmentSchema = SchemaFactory.createForClass(StudentEnrollment);
StudentEnrollmentSchema.plugin(commonFieldsPlugin);

// Compound unique index to prevent duplicate enrollments per student per institution per academic year
StudentEnrollmentSchema.index({ studentId: 1, institutionId: 1, academicYear: 1 }, { unique: true });
