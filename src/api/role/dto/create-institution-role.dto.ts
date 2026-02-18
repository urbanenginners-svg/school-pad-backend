import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateInstitutionRoleDto {
  @ApiProperty({
    example: 'Teacher',
    description: 'Name of the institution role',
  })
  @IsString()
  @IsNotEmpty({ message: 'Role name is required' })
  name: string;

  @ApiProperty({
    example: 'Role for teaching staff with access to student records',
    description: 'Description of the institution role',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ['perm::123e4567-e89b-12d3-a456-426614174000', 'perm::223e4567-e89b-12d3-a456-426614174001'],
    description: 'Array of permission IDs assigned to this role',
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];
}
