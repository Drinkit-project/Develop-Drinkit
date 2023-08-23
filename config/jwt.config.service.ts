import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET_ACCESS'), // 액세스 토큰 시크릿 값
      signOptions: { expiresIn: '5s' },
    };
  }

  createRefreshJwtOptions(): JwtModuleOptions {
    const options = {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      signOptions: { expiresIn: '1D' },
    };
    return options;
  }

  createEmailJwtOptions(): JwtModuleOptions {
    const options = {
      secret: this.configService.get<string>('JWT_SECRET_EMAIL'),
      signOptions: { expiresIn: '5m' },
    };
    return options;
  }
}
