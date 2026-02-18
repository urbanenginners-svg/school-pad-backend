import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import commonFieldsPlugin from "../plugins/common-fields";

export type InstitutionRoleDocument = InstitutionRole & Document;

@Schema({ collection: "institution-roles" })
export class InstitutionRole {
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
    ref: "Institution",
  })
  institutionId: string;

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
  })
  description?: string;

  @ApiProperty({ type: [String] })
  @Prop({
    type: [Types.ObjectId],
    default: [],
    ref: "Permission",
  })
  permissions: Types.ObjectId[]; // Array of permission ids

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

export const InstitutionRoleSchema = SchemaFactory.createForClass(InstitutionRole);

InstitutionRoleSchema.plugin(commonFieldsPlugin, { name: InstitutionRole.name });
