import { ApiProperty } from '@nestjs/swagger';

export class InstitutionAdminResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  institutionId: string;

  @ApiProperty({ type: [String] })
  role: string[];

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
}
