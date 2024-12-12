import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'Something' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'Something' })
  @IsString()
  password: string;
}
