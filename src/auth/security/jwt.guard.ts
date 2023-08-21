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

  async canActivate(context: ExecutionContext) {
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
        request.user = payload; // Set user data to the request

        // 액세스 토큰이 만료되었을 때 리프레시 토큰을 검증하고 액세스 토큰을 재발급합니다.
        if (this.authService.isAccessTokenExpired(payload.exp)) {
          const refreshToken = request.cookies.RefreshToken.replace(
            'Bearer ',
            '',
          );

          const verifiedRefreshToken =
            await this.authService.isRefreshTokenExpired(refreshToken);
          if (!verifiedRefreshToken) {
            throw new UnauthorizedException('세션이 만료되었습니다.'); // 세션 만료 오류
          }

          //예외처리를 통과했다는 건 Payload라는 것이기 때문에 Payload로 설정
          const user: Payload = verifiedRefreshToken as Payload;

          if (
            !this.authService.isRefreshTokenValid(refreshToken, user.userId)
          ) {
            throw new UnauthorizedException(
              '유효하지 않은 요청입니다. 관리자에게 문의하세요',
            ); // 유효하지 않은 리프레시 토큰 오류
          }

          const newAccessToken = await this.authService.generateAccessToken(
            user.userId,
          );

          // 새로운 액세스 토큰을 쿠키로 저장
          context
            .switchToHttp()
            .getResponse()
            .cookie('AccessToken', 'Bearer ' + newAccessToken);

          request.userId = user.userId;
        }
        request.userId = payload.userId;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token.');
      }
    } catch (error) {
      throw new UnauthorizedException('Token not found in the cookie.');
    }
  }
}
