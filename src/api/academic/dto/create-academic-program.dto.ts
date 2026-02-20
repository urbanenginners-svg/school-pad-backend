import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAcademicProgramDto {
  @ApiProperty({
    example: 'inst::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution ID',
  })
  @IsString()
  @IsNotEmpty({ message: 'Institution ID is required' })
  @IsMongoId({ message: 'Invalid institution ID format' })
  institutionId: string;

  @ApiProperty({
    example: 'Bachelor of Science in Computer Science',
    description: 'Name of the academic program',
  })
  @IsString()
  @IsNotEmpty({ message: 'Program name is required' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    example: 4,
    description: 'Duration of the program in years',
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Duration must be a number' })
  @IsOptional()
  durationInYears?: number;
}
