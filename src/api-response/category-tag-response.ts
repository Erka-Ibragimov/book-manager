import { ApiProperty } from '@nestjs/swagger';

export class CategoryTagResponse {
  @ApiProperty({ example: 'gdfgdfg434gs' })
  id: string;

  @ApiProperty({ example: 'something' })
  name: string;

  @ApiProperty({ example: '2024-12-12T11:07:08.448Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-12-12T11:07:08.448Z' })
  updatedAt: string;
}
