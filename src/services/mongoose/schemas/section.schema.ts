import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import commonFieldsPlugin from '../plugins/common-fields';

export type SectionDocument = Section & Document;

@Schema({ collection: 'sections' })
export class Section {
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
    ref: 'InstitutionUser',
  })
  classTeacherId?: string;

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

export const SectionSchema = SchemaFactory.createForClass(Section);
SectionSchema.plugin(commonFieldsPlugin);

// Compound unique index to prevent duplicate sections per class
SectionSchema.index({ institutionId: 1, classId: 1, name: 1 }, { unique: true });
