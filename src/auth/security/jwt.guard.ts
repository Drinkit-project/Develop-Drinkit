import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const accessToken = await request.cookies.AccessToken.replace(
        'Bearer ',
        '',
      );

      if (!accessToken) {
        throw new UnauthorizedException('Token not found in the cookie.');
      }
      try {
        const payload: any = await jwt.verify(
          accessToken,
          process.env.JWT_SECRET_ACCESS,
          { ignoreExpiration: true },
        );

        const myuser = await this.usersService.findByFields({
          where: { id: payload.userId },
        });
        request.myUser = myuser;

        await super.canActivate(context);

        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token.');
      }
    } catch (error) {
      throw new UnauthorizedException('Token not found in the cookie.');
    }
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): any {
    return (async () => {
      if (err) {
        throw new UnauthorizedException('AUTH', 'JWT AUTH ERROR');
      }

      if (info) {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies.RefreshToken.replace(
          'Bearer ',
          '',
        );

        try {
          const verifiedRefreshToken =
            await this.authService.isRefreshTokenExpired(refreshToken);

          if (!verifiedRefreshToken) {
            throw new UnauthorizedException('세션이 만료되었습니다.');
          }

          const payload: Payload = verifiedRefreshToken as Payload;

          if (
            !this.authService.isRefreshTokenValid(refreshToken, payload.userId)
          ) {
            throw new UnauthorizedException(
              '유효하지 않은 요청입니다. 관리자에게 문의하세요',
            );
          }

          const newAccessToken = await this.authService.generateAccessToken(
            payload.userId,
          );

          await context
            .switchToHttp()
            .getResponse()
            .cookie('AccessToken', 'Bearer ' + newAccessToken);

          const myuser = await this.usersService.findByFields({
            where: { id: payload.userId },
          });
          request.myUser = myuser;
        } catch (err) {
          console.log(err);
          throw new UnauthorizedException('다시 로그인 해주세요');
        }
      }
    })();
  }
}
