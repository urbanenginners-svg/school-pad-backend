import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateInstitutionRoleDto {
  @ApiProperty({
    example: 'Teacher',
    description: 'Name of the institution role',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Updated role description for teaching staff',
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
