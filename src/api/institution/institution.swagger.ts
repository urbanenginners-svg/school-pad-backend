import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { InstitutionResponseDto, InstitutionAdminResponseDto } from './dto';

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
