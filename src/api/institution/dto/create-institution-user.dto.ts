import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateInstitutionUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the institution user',
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the institution user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @ApiProperty({
    example: 'user@institution.com',
    description: 'Email address of the institution user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the institution user',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password for the institution user account',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution role ID for the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  roleId: string;
}
