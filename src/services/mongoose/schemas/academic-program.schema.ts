import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import commonFieldsPlugin from '../plugins/common-fields';

export type AcademicProgramDocument = AcademicProgram & Document;

@Schema({ collection: 'academic-programs' })
export class AcademicProgram {
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
    type: Number,
  })
  durationInYears?: number;

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

export const AcademicProgramSchema = SchemaFactory.createForClass(AcademicProgram);
AcademicProgramSchema.plugin(commonFieldsPlugin);

// Compound unique index to prevent duplicate programs per institution
AcademicProgramSchema.index({ institutionId: 1, name: 1 }, { unique: true });
