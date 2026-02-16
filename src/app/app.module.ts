import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppConfigModule } from "src/services/env/env.module";
import { AuthModule } from "src/api/auth/auth.module";
import { PermissionModule } from "src/api/permission/permission.module";
import { RoleModule } from "src/api/role/role.module";

@Module({
    imports: [AppConfigModule, AuthModule, RoleModule, PermissionModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
