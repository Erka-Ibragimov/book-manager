import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: 'Something' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Something' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'Something' })
  @IsOptional()
  @IsString()
  author: string;

  @ApiPropertyOptional({ example: 'dhdh35dfhert' })
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiPropertyOptional({ example: '["fsdfsd53g", "dsgjf34eu"]' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tagIds: string[];
}
