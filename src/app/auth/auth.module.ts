import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, TokenService, UserService],
})
export class AuthModule {}
