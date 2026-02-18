import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateInstitutionUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the institution user',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the institution user',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the institution user',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: 'inst-role::123e4567-e89b-12d3-a456-426614174000',
    description: 'Institution role ID for the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  roleId?: string;
}
