import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import commonFieldsPlugin from '../plugins/common-fields';

export type AcademicClassDocument = AcademicClass & Document;

@Schema({ collection: 'academic-classes' })
export class AcademicClass {
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
    index: true,
  })
  institutionId: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
    ref: 'AcademicProgram',
  })
  programId?: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  academicYear: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: Date,
  })
  startDate?: Date;

  @ApiProperty()
  @Prop({
    required: false,
    type: Date,
  })
  endDate?: Date;

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

export const AcademicClassSchema = SchemaFactory.createForClass(AcademicClass);
AcademicClassSchema.plugin(commonFieldsPlugin);

// Compound unique index to prevent duplicate classes per institution and academic year
AcademicClassSchema.index({ institutionId: 1, name: 1, academicYear: 1 }, { unique: true });
