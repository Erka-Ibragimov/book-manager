import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Something' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Something' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Something' })
  @IsString()
  author: string;

  @ApiProperty({ example: 'dhdh35dfhert' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: '["fsdfsd53g", "dsgjf34eu"]' })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tagIds: string[];
}
