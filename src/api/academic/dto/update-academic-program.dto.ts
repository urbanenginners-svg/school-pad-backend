import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateAcademicProgramDto {
  @ApiProperty({
    example: 'Bachelor of Science in Computer Science',
    description: 'Name of the academic program',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  name?: string;

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
