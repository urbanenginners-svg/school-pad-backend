import { Schema, SchemaFactory } from "@nestjs/mongoose";
import commonFieldsPlugin from "../plugins/common-fields";

@Schema({ collection: 'roles' })
export class Role{

}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.plugin(commonFieldsPlugin, { name: Role.name });
