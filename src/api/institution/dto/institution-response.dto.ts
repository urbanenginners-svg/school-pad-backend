import { ApiProperty } from '@nestjs/swagger';
import { InstitutionTypeEnum } from 'src/utils/enums/institution-type.enum';

export class InstitutionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  website?: string;

  @ApiProperty({
    enum: InstitutionTypeEnum,
  })
  type: InstitutionTypeEnum;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdBy?: string;

  @ApiProperty()
  lastUpdatedBy?: string;

  @ApiProperty()
  deletedBy?: string;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
