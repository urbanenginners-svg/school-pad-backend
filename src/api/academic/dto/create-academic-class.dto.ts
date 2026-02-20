import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAcademicClassDto {
  @ApiProperty({
    example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsMongoId({ message: 'Invalid institution ID format' })
  institutionId: string;

  @ApiProperty({
    example: 'Grade 10',
    description: 'Name of the academic class',
  })
  @IsString()
  @IsNotEmpty({ message: 'Class name is required' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    example: 'prog::123e4567-e89b-12d3-a456-426614174000',
    description: 'Academic program ID this class belongs to',
    required: false,
  })
  @IsString()
  @IsMongoId({ message: 'Invalid program ID format' })
  @IsOptional()
  programId?: string;

  @ApiProperty({
    example: '2024-2025',
    description: 'Academic year for this class',
  })
  @IsString()
  @IsNotEmpty({ message: 'Academic year is required' })
  @Transform(({ value }) => value?.trim())
  academicYear: string;

  @ApiProperty({
    example: '2024-09-01T00:00:00.000Z',
    description: 'Start date of the class',
    required: false,
  })
  @IsDateString({}, { message: 'Invalid start date format' })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2025-06-30T00:00:00.000Z',
    description: 'End date of the class',
    required: false,
  })
  @IsDateString({}, { message: 'Invalid end date format' })
  @IsOptional()
  endDate?: Date;
}
