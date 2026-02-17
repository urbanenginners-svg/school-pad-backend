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

import { InstitutionService } from "./institution.service";
import { CreateInstitutionDto, UpdateInstitutionDto } from "./dto";
import { DataResponse, PaginatedDataResponse } from "src/utils/response";
import {
  CreateInstitutionSwagger,
  GetAllInstitutionsSwagger,
  GetInstitutionByIdSwagger,
  UpdateInstitutionSwagger,
  DeleteInstitutionSwagger,
  ActivateInstitutionSwagger,
  DeactivateInstitutionSwagger,
} from "./institution.swagger";
import { CheckActionPolicy } from "src/services/casl/casl-policies.decorator";
import { PermissionEnum } from "src/utils/enums/permission.enum";
import { resource } from "src/utils/constants/resource";
import { CommonFieldsDto } from "src/utils/dtos/common-fields.dto";
import { PoliciesGuard } from "src/services/casl/casl-policies.guard";

@ApiTags("Institutions")
@Controller("institutions")
@UseGuards(PoliciesGuard)
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Version("1")
  @Post()
  @CreateInstitutionSwagger()
  @CheckActionPolicy(PermissionEnum.WRITE, resource.Institution)
  async create(@Body() createInstitutionDto: CreateInstitutionDto) {
    const result = await this.institutionService.create(createInstitutionDto);
    return new DataResponse(result);
  }

  @Version("1")
  @Get()
  @GetAllInstitutionsSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Institution)
  async findAll(@Query() query: CommonFieldsDto) {
    const result = await this.institutionService.findAll(query);
    return new PaginatedDataResponse(result.data, result.meta);
  }

  @Version("1")
  @Get(":id")
  @GetInstitutionByIdSwagger()
  @CheckActionPolicy(PermissionEnum.READ, resource.Institution)
  async findOne(@Param("id") id: string) {
    const result = await this.institutionService.findOne(id);
    return new DataResponse(result);
  }

  @Version("1")
  @Put(":id")
  @UpdateInstitutionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Institution)
  async update(
    @Param("id") id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    const result = await this.institutionService.update(
      id,
      updateInstitutionDto,
    );
    return new DataResponse(result);
  }

  @Version("1")
  @Delete(":id")
  @DeleteInstitutionSwagger()
  @CheckActionPolicy(PermissionEnum.DELETE, resource.Institution)
  async remove(@Param("id") id: string) {
    const result = await this.institutionService.remove(id);
    return new DataResponse(result);
  }

  @Version("1")
  @Patch(":id/activate")
  @ActivateInstitutionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Institution)
  async activate(@Param("id") id: string) {
    const result = await this.institutionService.activate(id);
    return new DataResponse(result);
  }

  @Version("1")
  @Patch(":id/deactivate")
  @DeactivateInstitutionSwagger()
  @CheckActionPolicy(PermissionEnum.UPDATE, resource.Institution)
  async deactivate(@Param("id") id: string) {
    const result = await this.institutionService.deactivate(id);
    return new DataResponse(result);
  }
}
