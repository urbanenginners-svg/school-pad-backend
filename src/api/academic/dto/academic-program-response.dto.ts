import { ApiProperty } from '@nestjs/swagger';

export class AcademicProgramResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  institutionId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  durationInYears?: number;

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
