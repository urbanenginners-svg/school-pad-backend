import { ApiProperty } from '@nestjs/swagger';

export class AcademicClassResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  institutionId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  programId?: string;

  @ApiProperty()
  academicYear: string;

  @ApiProperty()
  startDate?: Date;

  @ApiProperty()
  endDate?: Date;

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
