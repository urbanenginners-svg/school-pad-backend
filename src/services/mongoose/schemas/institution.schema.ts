import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import commonFieldsPlugin from '../plugins/common-fields';
import { InstitutionTypeEnum } from 'src/utils/enums/institution-type.enum';

export type InstitutionDocument = Institution & Document;

@Schema({ collection: 'institutions' })
export class Institution {
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
  })
  name: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  address: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  phone: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
  })
  website?: string;

  @ApiProperty()
  @Prop({
    required: true,
    enum: Object.values(InstitutionTypeEnum),
    type: String,
  })
  type: InstitutionTypeEnum;

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

export const InstitutionSchema = SchemaFactory.createForClass(Institution);

InstitutionSchema.plugin(commonFieldsPlugin, { name: Institution.name });
