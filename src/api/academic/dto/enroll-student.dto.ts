import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class EnrollStudentDto {
  @ApiProperty({
    example: 'user::123e4567-e89b-12d3-a456-426614174000',
    description: 'Student user ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Student ID is required' })
  @IsMongoId({ message: 'Invalid student ID format' })
  studentId: string;

  @ApiProperty({
    example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsMongoId({ message: 'Invalid institution ID format' })
  institutionId: string;

  @ApiProperty({
    example: 'class::123e4567-e89b-12d3-a456-426614174000',
    description: 'Academic class ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Class ID is required' })
  @IsMongoId({ message: 'Invalid class ID format' })
  classId: string;

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
  })
  @IsString()
  @IsNotEmpty({ message: 'Academic year is required' })
  @Transform(({ value }) => value?.trim())
  academicYear: string;
}
