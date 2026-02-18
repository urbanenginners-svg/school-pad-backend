import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateInstitutionAdminDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the institution admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the institution admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    example: 'admin@institution.com',
    description: 'Email address of the institution admin',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the institution admin',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password for the institution admin account',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
