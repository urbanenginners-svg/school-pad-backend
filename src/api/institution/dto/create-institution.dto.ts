import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { InstitutionTypeEnum } from 'src/utils/enums/institution-type.enum';

export class CreateInstitutionDto {
  @ApiProperty({
    example: 'Springfield High School',
    description: 'Name of the institution',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: '123 Main Street, Springfield, IL 62701',
    description: 'Physical address of the institution',
  })
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({
    example: '+1-555-123-4567',
    description: 'Contact phone number',
  })
  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @ApiProperty({
    example: 'info@springfield.edu',
    description: 'Contact email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

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
  })
  @IsEnum(InstitutionTypeEnum, { message: 'Invalid institution type' })
  @IsNotEmpty({ message: 'Type is required' })
  type: InstitutionTypeEnum;
}
