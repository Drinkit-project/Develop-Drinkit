import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const accessToken = request.cookies.AccessToken.replace('Bearer ', '');

      if (!accessToken) {
        throw new UnauthorizedException('Token not found in the cookie.');
      }
      try {
        const payload: any = jwt.verify(
          accessToken,
          process.env.JWT_SECRET_ACCESS,
          { ignoreExpiration: true },
        );
        request.userId = payload.userId;
        return super.canActivate(context);
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
    async () => {
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

          context
            .switchToHttp()
            .getResponse()
            .cookie('AccessToken', 'Bearer ' + newAccessToken);
          request.userId = payload;
          return user;
        } catch (err) {
          console.log(err);
          throw new UnauthorizedException('다시 로그인 해주세요');
        }
      }

      return user;
    };
  }
}
