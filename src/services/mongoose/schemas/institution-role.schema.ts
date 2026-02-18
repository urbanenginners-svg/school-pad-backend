import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

import commonFieldsPlugin from "../plugins/common-fields";

export type InstitutionRoleDocument = InstitutionRole & Document;

@Schema({ collection: "institution-roles" })
export class InstitutionRole {
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  _id?: string;

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    ref: "Institution",
  })
  institutionId: string;

  @Prop({
    required: false,
    type: String,
  })
  description?: string;

  @Prop({
    type: [Types.ObjectId],
    default: [],
    ref: "Permission",
  })
  permissions: Types.ObjectId[]; // Array of permission ids

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    required: false,
    type: String,
  })
  createdBy?: string;

  @Prop({
    required: false,
    type: String,
  })
  lastUpdatedBy?: string;

  @Prop({
    required: false,
    type: String,
  })
  deletedBy?: string;

  @Prop({
    required: false,
    type: Date,
  })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const InstitutionRoleSchema = SchemaFactory.createForClass(InstitutionRole);

InstitutionRoleSchema.plugin(commonFieldsPlugin, { name: InstitutionRole.name });
