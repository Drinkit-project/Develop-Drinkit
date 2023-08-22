import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../security/payload.interface';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies['AccessToken'].split(' ')[1];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_ACCESS,
      passReqToCallback: true,
    });
  }

  async validate(payload: Payload) {
    const user = await this.usersService.tokenValidateUser(payload);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }
    return user;
  }
}
