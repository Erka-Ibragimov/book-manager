import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: 'gksjdfj24j32jkfwfjwej235543593ryktgergjl3jtlk' })
  accessToken: string;
}

export class UserAlreadyExistedResponse {
  @ApiProperty({ example: '404' })
  statusCode: number;

  @ApiProperty({ example: 'This user is already existed' })
  message: string;
}

export class UserNotFoundOrPassNotEqualResponse {
  @ApiProperty({ example: '404' })
  statusCode: number;

  @ApiProperty({ example: 'This user not found or Password not equal' })
  message: string;
}
