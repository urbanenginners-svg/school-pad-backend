import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto";

export function SuperAdminLoginSwagger() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({summary: 'Super Admin Login', description: 'Authenticate a super admin user and return a JWT access token' }),
        ApiResponse({ 
            status: 200, 
            description: 'Login successful',
            type: LoginResponseDto,
          }),
          ApiResponse({ 
            status: 401, 
            description: 'Unauthorized - Invalid credentials or not a super admin' 
          })
    )
}