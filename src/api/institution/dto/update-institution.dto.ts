import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { InstitutionTypeEnum } from 'src/utils/enums/institution-type.enum';

export class UpdateInstitutionDto {
  @ApiProperty({
    example: 'Springfield High School',
    description: 'Name of the institution',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '123 Main Street, Springfield, IL 62701',
    description: 'Physical address of the institution',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: '+1-555-123-4567',
    description: 'Contact phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'info@springfield.edu',
    description: 'Contact email address',
    required: false,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'https://www.springfield.edu',
    description: 'Institution website URL',
    required: false,
  })
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsOptional()
  website?: string;

  @ApiProperty({
    example: InstitutionTypeEnum.SCHOOL,
    description: 'Type of institution',
    enum: InstitutionTypeEnum,
    required: false,
  })
  @IsEnum(InstitutionTypeEnum, { message: 'Invalid institution type' })
  @IsOptional()
  type?: InstitutionTypeEnum;
}
