import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStudentEnrollmentDto {
  @ApiProperty({
    example: 'class::123e4567-e89b-12d3-a456-426614174000',
    description: 'Academic class ID',
    required: false,
  })
  @IsString()
  @IsMongoId({ message: 'Invalid class ID format' })
  @IsOptional()
  classId?: string;

  @ApiProperty({
    example: 'sect::123e4567-e89b-12d3-a456-426614174000',
    description: 'Section ID',
    required: false,
  })
  @IsString()
  @IsMongoId({ message: 'Invalid section ID format' })
  @IsOptional()
  sectionId?: string;

  @ApiProperty({
    example: '2024-2025',
    description: 'Academic year for this enrollment',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  academicYear?: string;
}
