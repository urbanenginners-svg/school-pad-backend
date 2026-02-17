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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(commonFieldsPlugin, { name: User.name });
