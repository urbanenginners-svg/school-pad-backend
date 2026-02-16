import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [MongooseModule.forFeature([])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}  