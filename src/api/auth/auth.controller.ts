import { Body, Controller, Post, Version } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { DataResponse } from "src/utils/response";
import { LoginDto } from "./dto";
import { SuperAdminLoginSwagger } from "./auth.swagger";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version("1")
  @Post("superadmin/login")
  @SuperAdminLoginSwagger()
  async superAdminLogin(@Body() loginDto: LoginDto) {
    const result = await this.authService.superAdminLogin(loginDto);
    return new DataResponse(result);
  }
}
