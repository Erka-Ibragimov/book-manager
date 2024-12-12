import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
  @ApiProperty({ example: '401' })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
