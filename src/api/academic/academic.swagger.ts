import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  AcademicProgramResponseDto,
  AcademicClassResponseDto,
  SectionResponseDto,
  StudentEnrollmentResponseDto,
} from './dto';

// ============================================
// ACADEMIC PROGRAM SWAGGER DECORATORS
// ============================================

export function CreateProgramSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new academic program',
      description:
        'Create a new academic program for an institution. Requires WRITE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Academic Program created successfully',
      type: AcademicProgramResponseDto,
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
      status: 409,
      description: 'Conflict - Program with same name already exists',
    }),
  );
}

export function GetAllProgramsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all academic programs',
      description:
        'Retrieve a list of all academic programs for an institution with pagination. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of academic programs retrieved successfully',
      type: [AcademicProgramResponseDto],
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

export function GetProgramByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get academic program by ID',
      description:
        'Retrieve a single academic program by its ID. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Program ID',
      example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Program retrieved successfully',
      type: AcademicProgramResponseDto,
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
      description: 'Not Found - Academic Program does not exist',
    }),
  );
}

export function UpdateProgramSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update academic program',
      description:
        'Update an existing academic program. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Program ID',
      example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Program updated successfully',
      type: AcademicProgramResponseDto,
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
      description: 'Not Found - Academic Program does not exist',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Program with same name already exists',
    }),
  );
}

export function DeleteProgramSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete academic program',
      description:
        'Soft delete an academic program. Requires DELETE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Program ID',
      example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Program deleted successfully',
      type: AcademicProgramResponseDto,
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
      description: 'Not Found - Academic Program does not exist',
    }),
  );
}

export function ActivateProgramSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate academic program',
      description:
        'Activate an academic program. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Program ID',
      example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Program activated successfully',
      type: AcademicProgramResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Program is already active',
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
      description: 'Not Found - Academic Program does not exist',
    }),
  );
}

export function DeactivateProgramSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate academic program',
      description:
        'Deactivate an academic program. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Program ID',
      example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Program deactivated successfully',
      type: AcademicProgramResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Program is already inactive',
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
      description: 'Not Found - Academic Program does not exist',
    }),
  );
}

// ============================================
// ACADEMIC CLASS SWAGGER DECORATORS
// ============================================

export function CreateClassSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new academic class',
      description:
        'Create a new academic class for an institution. Requires WRITE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Academic Class created successfully',
      type: AcademicClassResponseDto,
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
      status: 409,
      description: 'Conflict - Class with same name and academic year already exists',
    }),
  );
}

export function GetAllClassesSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all academic classes',
      description:
        'Retrieve a list of all academic classes for an institution with pagination. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of academic classes retrieved successfully',
      type: [AcademicClassResponseDto],
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

export function GetClassByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get academic class by ID',
      description:
        'Retrieve a single academic class by its ID. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Class retrieved successfully',
      type: AcademicClassResponseDto,
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
      description: 'Not Found - Academic Class does not exist',
    }),
  );
}

export function UpdateClassSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update academic class',
      description:
        'Update an existing academic class. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Class updated successfully',
      type: AcademicClassResponseDto,
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
      description: 'Not Found - Academic Class does not exist',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Class with same name and academic year already exists',
    }),
  );
}

export function DeleteClassSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete academic class',
      description:
        'Soft delete an academic class. Requires DELETE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Class deleted successfully',
      type: AcademicClassResponseDto,
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
      description: 'Not Found - Academic Class does not exist',
    }),
  );
}

export function ActivateClassSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate academic class',
      description:
        'Activate an academic class. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Class activated successfully',
      type: AcademicClassResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Class is already active',
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
      description: 'Not Found - Academic Class does not exist',
    }),
  );
}

export function DeactivateClassSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate academic class',
      description:
        'Deactivate an academic class. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Academic Class deactivated successfully',
      type: AcademicClassResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Class is already inactive',
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
      description: 'Not Found - Academic Class does not exist',
    }),
  );
}

// ============================================
// SECTION SWAGGER DECORATORS
// ============================================

export function CreateSectionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Create a new section',
      description:
        'Create a new section for an academic class. Requires WRITE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Section created successfully',
      type: SectionResponseDto,
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
      status: 409,
      description: 'Conflict - Section with same name already exists for this class',
    }),
  );
}

export function GetAllSectionsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all sections for a class',
      description:
        'Retrieve a list of all sections for an academic class with pagination. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of sections retrieved successfully',
      type: [SectionResponseDto],
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

export function GetSectionByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get section by ID',
      description:
        'Retrieve a single section by its ID. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Section ID',
      example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Section retrieved successfully',
      type: SectionResponseDto,
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
      description: 'Not Found - Section does not exist',
    }),
  );
}

export function UpdateSectionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update section',
      description:
        'Update an existing section. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Section ID',
      example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Section updated successfully',
      type: SectionResponseDto,
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
      description: 'Not Found - Section does not exist',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Section with same name already exists for this class',
    }),
  );
}

export function DeleteSectionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete section',
      description:
        'Soft delete a section. Requires DELETE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Section ID',
      example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Section deleted successfully',
      type: SectionResponseDto,
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
      description: 'Not Found - Section does not exist',
    }),
  );
}

export function ActivateSectionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate section',
      description:
        'Activate a section. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Section ID',
      example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Section activated successfully',
      type: SectionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Section is already active',
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
      description: 'Not Found - Section does not exist',
    }),
  );
}

export function DeactivateSectionSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate section',
      description:
        'Deactivate a section. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Section ID',
      example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Section deactivated successfully',
      type: SectionResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Section is already inactive',
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
      description: 'Not Found - Section does not exist',
    }),
  );
}

// ============================================
// STUDENT ENROLLMENT SWAGGER DECORATORS
// ============================================

export function EnrollStudentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Enroll a student',
      description:
        'Enroll a student in an academic class. Requires WRITE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 201,
      description: 'Student enrolled successfully',
      type: StudentEnrollmentResponseDto,
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
      status: 409,
      description: 'Conflict - Student already enrolled for this academic year',
    }),
  );
}

export function GetAllEnrollmentsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get all enrollments for a class',
      description:
        'Retrieve a list of all student enrollments for an academic class with pagination. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'List of enrollments retrieved successfully',
      type: [StudentEnrollmentResponseDto],
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

export function GetEnrollmentByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get enrollment by ID',
      description:
        'Retrieve a single student enrollment by its ID. Requires READ permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Enrollment ID',
      example: 'enrl::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Enrollment retrieved successfully',
      type: StudentEnrollmentResponseDto,
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
      description: 'Not Found - Enrollment does not exist',
    }),
  );
}

export function UpdateEnrollmentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update enrollment',
      description:
        'Update an existing student enrollment. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Enrollment ID',
      example: 'enrl::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Enrollment updated successfully',
      type: StudentEnrollmentResponseDto,
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
      description: 'Not Found - Enrollment does not exist',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Student already enrolled for this academic year',
    }),
  );
}

export function DeleteEnrollmentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete enrollment',
      description:
        'Soft delete a student enrollment. Requires DELETE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Enrollment ID',
      example: 'enrl::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Enrollment deleted successfully',
      type: StudentEnrollmentResponseDto,
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
      description: 'Not Found - Enrollment does not exist',
    }),
  );
}

export function ActivateEnrollmentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Activate enrollment',
      description:
        'Activate a student enrollment. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Enrollment ID',
      example: 'enrl::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Enrollment activated successfully',
      type: StudentEnrollmentResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Enrollment is already active',
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
      description: 'Not Found - Enrollment does not exist',
    }),
  );
}

export function DeactivateEnrollmentSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Deactivate enrollment',
      description:
        'Deactivate a student enrollment. Requires UPDATE permission on Academic resource.',
    }),
    ApiParam({
      name: 'institutionId',
      description: 'Institution ID',
      example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'classId',
      description: 'Academic Class ID',
      example: 'class::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiParam({
      name: 'id',
      description: 'Enrollment ID',
      example: 'enrl::123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: 'Enrollment deactivated successfully',
      type: StudentEnrollmentResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Enrollment is already inactive',
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
      description: 'Not Found - Enrollment does not exist',
    }),
  );
}
