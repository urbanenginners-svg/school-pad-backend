import { ApiProperty } from '@nestjs/swagger';

export class SectionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  institutionId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  classId: string;

  @ApiProperty()
  classTeacherId?: string;

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
