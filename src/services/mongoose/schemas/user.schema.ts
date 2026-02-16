import { Schema, SchemaFactory } from "@nestjs/mongoose";
import commonFieldsPlugin from "../plugins/common-fields";

@Schema({ collection: 'users' })
export class User {}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(commonFieldsPlugin, { name: User.name });
    