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
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { RoleService } from "./role.service";
import { CreateInstitutionRoleDto, UpdateInstitutionRoleDto } from "./dto";
import { DataResponse, PaginatedDataResponse } from "src/utils/response";
import {
  CreateInstitutionRoleSwagger,
  GetAllInstitutionRolesSwagger,
  GetInstitutionRoleByIdSwagger,
  UpdateInstitutionRoleSwagger,
  DeleteInstitutionRoleSwagger,
  ActivateInstitutionRoleSwagger,
  DeactivateInstitutionRoleSwagger,
} from "./role.swagger";
import { CheckInstitutionActionPolicy } from "src/services/casl/institution-policies.decorator";
import { PermissionEnum } from "src/utils/enums/permission.enum";
import { resource } from "src/utils/constants/resource";
import { CommonFieldsDto } from "src/utils/dtos/common-fields.dto";
import { InstitutionPoliciesGuard } from "src/services/casl/institution-policies.guard";

@ApiTags("Institution Roles")
@Controller("institutions/:institutionId/roles")
@UseGuards(InstitutionPoliciesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Version("1")
  @Post()
  @CreateInstitutionRoleSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.WRITE, resource.InstitutionRole)
  async create(
    @Param("institutionId") institutionId: string,
    @Body() createInstitutionRoleDto: CreateInstitutionRoleDto,
  ) {
    const result = await this.roleService.createInstitutionRole(
      institutionId,
      createInstitutionRoleDto,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Get()
  @GetAllInstitutionRolesSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.READ, resource.InstitutionRole)
  async findAll(
    @Param("institutionId") institutionId: string,
    @Query() query: CommonFieldsDto,
  ) {
    const result = await this.roleService.findAllInstitutionRoles(
      institutionId,
      query,
    );
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version("1")
  @Get(":id")
  @GetInstitutionRoleByIdSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.READ, resource.InstitutionRole)
  async findOne(
    @Param("institutionId") institutionId: string,
    @Param("id") id: string,
  ) {
    const result = await this.roleService.findOneInstitutionRole(
      institutionId,
      id,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Put(":id")
  @UpdateInstitutionRoleSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.UPDATE, resource.InstitutionRole)
  async update(
    @Param("institutionId") institutionId: string,
    @Param("id") id: string,
    @Body() updateInstitutionRoleDto: UpdateInstitutionRoleDto,
  ) {
    const result = await this.roleService.updateInstitutionRole(
      institutionId,
      id,
      updateInstitutionRoleDto,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Delete(":id")
  @DeleteInstitutionRoleSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.DELETE, resource.InstitutionRole)
  async remove(
    @Param("institutionId") institutionId: string,
    @Param("id") id: string,
  ) {
    const result = await this.roleService.removeInstitutionRole(
      institutionId,
      id,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Patch(":id/activate")
  @ActivateInstitutionRoleSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.UPDATE, resource.InstitutionRole)
  async activate(
    @Param("institutionId") institutionId: string,
    @Param("id") id: string,
  ) {
    const result = await this.roleService.activateInstitutionRole(
      institutionId,
      id,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Patch(":id/deactivate")
  @DeactivateInstitutionRoleSwagger()
  @CheckInstitutionActionPolicy(PermissionEnum.UPDATE, resource.InstitutionRole)
  async deactivate(
    @Param("institutionId") institutionId: string,
    @Param("id") id: string,
  ) {
    const result = await this.roleService.deactivateInstitutionRole(
      institutionId,
      id,
    );
    return new DataResponse(result);
  }
}

