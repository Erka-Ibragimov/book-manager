import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PasswordNotEqual, UserExists, UserNotFound } from '../errors';
import { Auth, IAuth } from 'src/common/auth.decorator';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  AuthResponse,
  UserAlreadyExistedResponse,
  UserNotFoundOrPassNotEqualResponse,
} from '../../api-response/auth-response';
import { ForbiddenResponse } from 'src/api-response/common-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    type: AuthResponse,
  })
  @ApiResponse({ status: 404, type: UserAlreadyExistedResponse })
  @Post('/register')
  async register(@Body() data: AuthDto) {
    try {
      return await this.authService.register(data);
    } catch (error: unknown) {
      if (error instanceof UserExists) {
        throw new HttpException(
          error.message || 'This user is already existed',
          404,
        );
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }

  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({
    status: 200,
    type: AuthResponse,
  })
  @ApiResponse({ status: 404, type: UserNotFoundOrPassNotEqualResponse })
  @Post('/login')
  async login(@Body() data: AuthDto) {
    try {
      return await this.authService.login(data);
    } catch (error: unknown) {
      if (error instanceof UserNotFound) {
        throw new HttpException(error.message || 'This user not found', 404);
      } else if (error instanceof PasswordNotEqual) {
        throw new HttpException(error.message || 'Password not equal', 404);
      } else {
        throw new HttpException('Server error', 500);
      }
    }
  }

  @ApiOperation({ summary: 'Logout from service' })
  @ApiResponse({
    status: 200,
    example: true,
  })
  @ApiResponse({ status: 401, type: ForbiddenResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/logout')
  async logout(@Auth() data: IAuth) {
    try {
      return await this.authService.logout(data);
    } catch {
      throw new HttpException('Server error', 500);
    }
  }
}
