import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies['RefreshToken'].split(' ')[1];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH,
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: Payload) {
    try {
      const refreshToken = request.cookies.RefreshToken.replace('Bearer ', '');

      const user = await this.usersService.tokenValidateUser(payload);
      if (!user) {
        throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
      }

      if (!this.authService.isRefreshTokenValid(refreshToken, payload.userId)) {
        throw new UnauthorizedException(
          '유효하지 않은 요청입니다. 관리자에게 문의하세요',
        );
      }

      const accessToken = await this.authService.generateAccessToken(
        payload.userId,
      );

      request.response.cookie('AccessToken', 'Bearer ' + accessToken);

      const myuser = await this.usersService.findByFields({
        where: { id: payload.userId },
      });
      request.myUser = myuser;
    } catch (err) {
      throw new UnauthorizedException('다시 로그인 해주세요');
    }
  }
}
