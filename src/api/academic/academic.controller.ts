import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Version,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AcademicService } from './academic.service';
import {
  CreateAcademicProgramDto,
  UpdateAcademicProgramDto,
  CreateAcademicClassDto,
  UpdateAcademicClassDto,
  CreateSectionDto,
  UpdateSectionDto,
  EnrollStudentDto,
  UpdateStudentEnrollmentDto,
} from './dto';
import { DataResponse, PaginatedDataResponse } from 'src/utils/response';
import {
  CreateProgramSwagger,
  GetAllProgramsSwagger,
  GetProgramByIdSwagger,
  UpdateProgramSwagger,
  DeleteProgramSwagger,
  ActivateProgramSwagger,
  DeactivateProgramSwagger,
  CreateClassSwagger,
  GetAllClassesSwagger,
  GetClassByIdSwagger,
  UpdateClassSwagger,
  DeleteClassSwagger,
  ActivateClassSwagger,
  DeactivateClassSwagger,
  CreateSectionSwagger,
  GetAllSectionsSwagger,
  GetSectionByIdSwagger,
  UpdateSectionSwagger,
  DeleteSectionSwagger,
  ActivateSectionSwagger,
  DeactivateSectionSwagger,
  EnrollStudentSwagger,
  GetAllEnrollmentsSwagger,
  GetEnrollmentByIdSwagger,
  UpdateEnrollmentSwagger,
  DeleteEnrollmentSwagger,
  ActivateEnrollmentSwagger,
  DeactivateEnrollmentSwagger,
} from './academic.swagger';
import { CheckActionPolicy } from 'src/services/casl/casl-policies.decorator';
import { PermissionEnum } from 'src/utils/enums/permission.enum';
import { resource } from 'src/utils/constants/resource';
import { CommonFieldsDto } from 'src/utils/dtos/common-fields.dto';
import { PoliciesGuard } from 'src/services/casl/casl-policies.guard';

@ApiTags('Academic')
@Controller('institutions/:institutionId/academic')
@UseGuards(PoliciesGuard)
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  // ============================================
  // ACADEMIC PROGRAM ENDPOINTS
  // ============================================

  @Version('1')
  @Post('program')
  @CreateProgramSwagger()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Academic)
  async createProgram(
    @Param('institutionId') institutionId: string,
    @Body() createProgramDto: CreateAcademicProgramDto,
  ) {
    // Ensure institutionId from URL matches DTO
    createProgramDto.institutionId = institutionId;
    const result = await this.academicService.createProgram(createProgramDto);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('program')
  @GetAllProgramsSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findAllPrograms(
    @Param('institutionId') institutionId: string,
    @Query() query: CommonFieldsDto,
  ) {
    const result = await this.academicService.findAllPrograms(
      institutionId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('program/:id')
  @GetProgramByIdSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findOneProgram(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.findOneProgram(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Put('program/:id')
  @UpdateProgramSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async updateProgram(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateAcademicProgramDto,
  ) {
    const result = await this.academicService.updateProgram(
      id,
      institutionId,
      updateProgramDto,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Delete('program/:id')
  @DeleteProgramSwagger()
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Academic)
  async removeProgram(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.removeProgram(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('program/:id/activate')
  @ActivateProgramSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async activateProgram(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.activateProgram(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('program/:id/deactivate')
  @DeactivateProgramSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async deactivateProgram(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.deactivateProgram(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }

  // ============================================
  // ACADEMIC CLASS ENDPOINTS
  // ============================================

  @Version('1')
  @Post('class')
  @CreateClassSwagger()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Academic)
  async createClass(
    @Param('institutionId') institutionId: string,
    @Body() createClassDto: CreateAcademicClassDto,
  ) {
    // Ensure institutionId from URL matches DTO
    createClassDto.institutionId = institutionId;
    const result = await this.academicService.createClass(createClassDto);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('class')
  @GetAllClassesSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findAllClasses(
    @Param('institutionId') institutionId: string,
    @Query() query: CommonFieldsDto,
  ) {
    const result = await this.academicService.findAllClasses(
      institutionId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('class/:id')
  @GetClassByIdSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findOneClass(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.findOneClass(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Put('class/:id')
  @UpdateClassSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async updateClass(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
    @Body() updateClassDto: UpdateAcademicClassDto,
  ) {
    const result = await this.academicService.updateClass(
      id,
      institutionId,
      updateClassDto,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Delete('class/:id')
  @DeleteClassSwagger()
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Academic)
  async removeClass(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.removeClass(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('class/:id/activate')
  @ActivateClassSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async activateClass(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.activateClass(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('class/:id/deactivate')
  @DeactivateClassSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async deactivateClass(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.deactivateClass(id, institutionId);
    return new DataResponse(result);
  }

  // ============================================
  // SECTION ENDPOINTS
  // ============================================

  @Version('1')
  @Post('section')
  @CreateSectionSwagger()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Academic)
  async createSection(
    @Param('institutionId') institutionId: string,
    @Body() createSectionDto: CreateSectionDto,
  ) {
    // Ensure institutionId from URL matches DTO
    createSectionDto.institutionId = institutionId;
    const result = await this.academicService.createSection(createSectionDto);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('section/:classId')
  @GetAllSectionsSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findAllSections(
    @Param('institutionId') institutionId: string,
    @Param('classId') classId: string,
    @Query() query: CommonFieldsDto,
  ) {
    const result = await this.academicService.findAllSections(
      institutionId,
      classId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('section/:classId/:id')
  @GetSectionByIdSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findOneSection(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.findOneSection(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Put('section/:classId/:id')
  @UpdateSectionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async updateSection(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ) {
    const result = await this.academicService.updateSection(
      id,
      institutionId,
      updateSectionDto,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Delete('section/:classId/:id')
  @DeleteSectionSwagger()
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Academic)
  async removeSection(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.removeSection(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('section/:classId/:id/activate')
  @ActivateSectionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async activateSection(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.activateSection(id, institutionId);
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('section/:classId/:id/deactivate')
  @DeactivateSectionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async deactivateSection(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.deactivateSection(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }

  // ============================================
  // STUDENT ENROLLMENT ENDPOINTS
  // ============================================

  @Version('1')
  @Post('enroll')
  @EnrollStudentSwagger()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Academic)
  async enrollStudent(
    @Param('institutionId') institutionId: string,
    @Body() enrollDto: EnrollStudentDto,
  ) {
    // Ensure institutionId from URL matches DTO
    enrollDto.institutionId = institutionId;
    const result = await this.academicService.enrollStudent(enrollDto);
    return new DataResponse(result);
  }

  @Version('1')
  @Get('enrollments/:classId')
  @GetAllEnrollmentsSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findAllEnrollments(
    @Param('institutionId') institutionId: string,
    @Param('classId') classId: string,
    @Query() query: CommonFieldsDto,
  ) {
    const result = await this.academicService.findAllEnrollments(
      institutionId,
      classId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version('1')
  @Get('enrollments/:classId/:id')
  @GetEnrollmentByIdSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Academic)
  async findOneEnrollment(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.findOneEnrollment(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Put('enrollments/:classId/:id')
  @UpdateEnrollmentSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async updateEnrollment(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateStudentEnrollmentDto,
  ) {
    const result = await this.academicService.updateEnrollment(
      id,
      institutionId,
      updateEnrollmentDto,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Delete('enrollments/:classId/:id')
  @DeleteEnrollmentSwagger()
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Academic)
  async removeEnrollment(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.removeEnrollment(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('enrollments/:classId/:id/activate')
  @ActivateEnrollmentSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async activateEnrollment(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.activateEnrollment(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }

  @Version('1')
  @Patch('enrollments/:classId/:id/deactivate')
  @DeactivateEnrollmentSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Academic)
  async deactivateEnrollment(
    @Param('institutionId') institutionId: string,
    @Param('id') id: string,
  ) {
    const result = await this.academicService.deactivateEnrollment(
      id,
      institutionId,
    );
    return new DataResponse(result);
  }
}
