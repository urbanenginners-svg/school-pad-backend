import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InstitutionResponseDto, InstitutionAdminResponseDto, InstitutionUserResponseDto } from './dto';

export function CreateInstitutionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new institution',
      description: 'Create a new institution. Only Super Admin can perform this operation.',
    }),
    ApiResponse({
      status: 201,
      description: 'Institution created successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
  );
}

export function GetAllInstitutionsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all institutions',
      description: 'Retrieve a list of all institutions. Only Super Admin can perform this operation.',
    }),
    ApiResponse({
      status: 200,
      description: 'List of institutions retrieved successfully',
      type: [InstitutionResponseDto],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
  );
}

export function GetInstitutionByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get institution by ID',
      description: 'Retrieve a single institution by its ID. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution retrieved successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function UpdateInstitutionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update institution',
      description: 'Update an existing institution by its ID. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution updated successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function DeleteInstitutionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete institution',
      description: 'Soft delete an institution by its ID. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution deleted successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function ActivateInstitutionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate institution',
      description: 'Activate an institution by its ID. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution activated successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Institution is already active',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function DeactivateInstitutionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate institution',
      description: 'Deactivate an institution by its ID. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution deactivated successfully',
      type: InstitutionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Institution is already inactive',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function CreateInstitutionAdminSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create institution admin',
      description: 'Create an institution admin user for a specific institution. This user will have administrative privileges for the specified institution. Only Super Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Institution admin created successfully',
      type: InstitutionAdminResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data or institution is inactive',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - User with email or phone number already exists',
    }),
  );
}

// Institution User Management Swagger Decorators
export function CreateInstitutionUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create institution user',
      description: 'Create a user for a specific institution. This user will be part of the institution and managed separately from system users. Institution Admin can perform this operation.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Institution user created successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data or institution is inactive',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution or role not found',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - User with email or phone number already exists',
    }),
  );
}

export function GetAllInstitutionUsersSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all institution users',
      description: 'Retrieve a paginated list of all users belonging to a specific institution.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of institution users retrieved successfully',
      type: [InstitutionUserResponseDto],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution not found',
    }),
  );
}

export function GetInstitutionUserByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get institution user by ID',
      description: 'Retrieve a single institution user by their ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'userId',
      description: 'Institution User ID',
      example: 'inst-user::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution user retrieved successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution or user not found',
    }),
  );
}

export function UpdateInstitutionUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update institution user',
      description: 'Update an existing institution user by their ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'userId',
      description: 'Institution User ID',
      example: 'inst-user::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution user updated successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution, user, or role not found',
    }),
  );
}

export function DeleteInstitutionUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete institution user',
      description: 'Soft delete an institution user by their ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'userId',
      description: 'Institution User ID',
      example: 'inst-user::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution user deleted successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution or user not found',
    }),
  );
}

export function ActivateInstitutionUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate institution user',
      description: 'Activate an institution user by their ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'userId',
      description: 'Institution User ID',
      example: 'inst-user::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution user activated successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - User is already active',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution or user not found',
    }),
  );
}

export function DeactivateInstitutionUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate institution user',
      description: 'Deactivate an institution user by their ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'userId',
      description: 'Institution User ID',
      example: 'inst-user::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution user deactivated successfully',
      type: InstitutionUserResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - User is already inactive',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),
    ApiResponse({
      status: 404,
      description: 'Institution or user not found',
    }),
  );
}
