import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CommonFieldsDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  limit?: number;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  page?: number;

   @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  q?: string;
}
