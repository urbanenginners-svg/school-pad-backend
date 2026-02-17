import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  superAdminLogin() {
    const response = {
      access_token: "dfdfdffdfdffdf",
    };

    return response;
  }
}
