import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InstitutionRoleResponseDto } from './dto';

export function CreateInstitutionRoleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new institution role',
      description: 'Create a new role for an institution. Only institution admins can perform this operation for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Institution role created successfully',
      type: InstitutionRoleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data or inactive institution',
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
      description: 'Conflict - Role name already exists for this institution',
    }),
  );
}

export function GetAllInstitutionRolesSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all institution roles',
      description: 'Retrieve a list of all roles for an institution. Only institution admins can access roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of institution roles retrieved successfully',
      type: [InstitutionRoleResponseDto],
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

export function GetInstitutionRoleByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get institution role by ID',
      description: 'Retrieve a single institution role by its ID. Only institution admins can access roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution Role ID',
      example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution role retrieved successfully',
      type: InstitutionRoleResponseDto,
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
  );
}

export function UpdateInstitutionRoleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update institution role',
      description: 'Update an existing institution role by its ID. Only institution admins can update roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution Role ID',
      example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution role updated successfully',
      type: InstitutionRoleResponseDto,
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
      description: 'Institution or role not found',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Role name already exists for this institution',
    }),
  );
}

export function DeleteInstitutionRoleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete institution role',
      description: 'Soft delete an institution role by its ID. Only institution admins can delete roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution Role ID',
      example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution role deleted successfully',
      type: InstitutionRoleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Role is assigned to users',
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
  );
}

export function ActivateInstitutionRoleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate institution role',
      description: 'Activate an institution role by its ID. Only institution admins can activate roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution Role ID',
      example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution role activated successfully',
      type: InstitutionRoleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Role is already active',
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
  );
}

export function DeactivateInstitutionRoleSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate institution role',
      description: 'Deactivate an institution role by its ID. Only institution admins can deactivate roles for their institution.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Institution Role ID',
      example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Institution role deactivated successfully',
      type: InstitutionRoleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Role is already inactive',
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
  );
}
