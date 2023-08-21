import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../security/payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload): Promise<any> {
    const user = await this.authService.tokenValidateUser(payload);
    if (!user) {
      new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }
    return user;
  }
}
