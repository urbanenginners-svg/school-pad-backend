import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSectionDto {
  @ApiProperty({
    example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsMongoId({ message: 'Invalid institution ID format' })
  institutionId: string;

  @ApiProperty({
    example: 'Section A',
    description: 'Name of the section',
  })
  @IsString()
  @IsNotEmpty({ message: 'Section name is required' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    example: 'class::123e4567-e89b-12d3-a456-426614174000',
    description: 'Academic class ID this section belongs to',
  })
  @IsString()
  @IsNotEmpty({ message: 'Class ID is required' })
  @IsMongoId({ message: 'Invalid class ID format' })
  classId: string;

  @ApiProperty({
    example: 'user::123e4567-e89b-12d3-a456-426614174000',
    description: 'Class teacher user ID',
    required: false,
  })
  @IsString()
  @IsMongoId({ message: 'Invalid class teacher ID format' })
  @IsOptional()
  classTeacherId?: string;
}
