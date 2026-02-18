import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import commonFieldsPlugin from "../plugins/common-fields";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";
import { Role } from "./role.schema";

@Schema({ collection: "users" })
export class User {
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

  @ApiProperty({ type: [String] })
  @Prop({
    type: [Types.ObjectId],
    ref: "Role",
  })
  role: Role[];

  @ApiProperty()
  @Prop({
    required: false,
    type: String,
    ref: "Institution",
  })
  institutionId?: string;

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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(commonFieldsPlugin, { name: User.name });
