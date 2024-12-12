import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PasswordNotEqual, UserExists, UserNotFound } from '../errors';
import { IAuth } from 'src/common/auth.decorator';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  async register({ login, password }: AuthDto) {
    const existUser = await this.userService.findUserByLogin(login);

    if (existUser) throw new UserExists();

    const hashPassword = await this.userService.hashPassword(password);

    const newUser = await this.userService.createUser(login, hashPassword);

    const accessToken = await this.tokenService.generateAccessToken({
      id: newUser.id,
      login: newUser.login,
    });

    return { accessToken: accessToken };
  }

  async login({ login, password }: AuthDto) {
    const isExistUser = await this.userService.findUserByLogin(login);

    if (!isExistUser) throw new UserNotFound();

    const isPasswordEquals = await this.userService.validatePassword(
      password,
      isExistUser.password,
    );

    if (!isPasswordEquals) throw new PasswordNotEqual();

    const accessToken = await this.tokenService.generateAccessToken({
      id: isExistUser.id,
      login: isExistUser.login,
    });

    return { accessToken: accessToken };
  }

  async logout({ id }: IAuth) {
    return await this.tokenService.deleteToken(id);
  }
}
