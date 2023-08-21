import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from '../security/payload.interface';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log('ㅇㅇ');
    const user = await this.usersService.tokenValidateUser(payload);
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }
    return user;
  }
}
