import { Controller, Post, Version } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DataResponse } from "src/utils/response";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version("1")
  @Post("login")
  superAdminLogin() {
    const result = this.authService.superAdminLogin();
    return new DataResponse(result);
  }
}
