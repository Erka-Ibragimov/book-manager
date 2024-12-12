import { ApiProperty } from '@nestjs/swagger';

export class BookResponse {
  @ApiProperty({ example: 'sgsgf234sgay345h' })
  id: string;

  @ApiProperty({ example: 'something' })
  title: string;

  @ApiProperty({ example: 'something' })
  description: string;

  @ApiProperty({ example: 'something' })
  author: string;

  @ApiProperty({ example: 'fdsg25ysgdhdfhdj' })
  userId: string;

  @ApiProperty({ example: 'gfdh34cb63466ghh' })
  categoryId: string;

  @ApiProperty({ example: '2024-12-12T11:07:08.448Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-12-12T11:07:08.448Z' })
  updatedAt: string;
}

export class BookNotFoundResponse {
  @ApiProperty({ example: '404' })
  statusCode: number;

  @ApiProperty({ example: 'Book not found' })
  message: string;
}
