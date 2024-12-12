import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findUserByLogin(login: string) {
    return this.prismaService.user.findUnique({ where: { login } });
  }

  async createUser(login: string, hashedPassword: string) {
    return this.prismaService.user.create({
      data: { login, password: hashedPassword },
    });
  }

  async validatePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string, salt = 3) {
    return hash(password, salt);
  }
}
