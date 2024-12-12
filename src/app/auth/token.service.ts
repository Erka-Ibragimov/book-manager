import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateAccessToken(payload: { id: string; login: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: 600,
    });
    await this.cacheManager.set(
      `user:${payload.id}`,
      JSON.stringify({ accessToken }),
    );
    return accessToken;
  }

  async deleteToken(userId: string) {
    await this.cacheManager.del(`user:${userId}`);
    return true;
  }
}
