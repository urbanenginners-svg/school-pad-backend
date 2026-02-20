import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateSectionDto {
  @ApiProperty({
    example: 'Section A',
    description: 'Name of the section',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  name?: string;

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
