import { ApiProperty } from '@nestjs/swagger';

export class StudentEnrollmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty()
  institutionId: string;

  @ApiProperty()
  classId: string;

  @ApiProperty()
  sectionId?: string;

  @ApiProperty()
  academicYear: string;

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
