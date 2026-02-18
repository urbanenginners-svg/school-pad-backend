import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import commonFieldsPlugin from "../plugins/common-fields";
import { ApiProperty } from "@nestjs/swagger";
import { Types, Document } from "mongoose";

export type InstitutionUserDocument = InstitutionUser & Document;

@Schema({ collection: "institution-users" })
export class InstitutionUser {
  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  _id: string;

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    unique: true,
    sparse: true,
  })
  phoneNumber: string;

  @ApiProperty()
  @Prop({
    required: false,
  })
  password: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: String,
    ref: "Institution",
  })
  institutionId: string;

  @ApiProperty({ type: [String] })
  @Prop({
    type: [Types.ObjectId],
    ref: "InstitutionRole",
  })
  role: Types.ObjectId[];

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

export const InstitutionUserSchema = SchemaFactory.createForClass(InstitutionUser);

InstitutionUserSchema.plugin(commonFieldsPlugin, { name: InstitutionUser.name });
