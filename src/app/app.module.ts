import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppConfigModule } from "src/services/env/env.module";
import { AuthModule } from "src/api/auth/auth.module";

@Module({
    imports: [AppConfigModule, AuthModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
