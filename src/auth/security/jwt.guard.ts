import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';
import { UsersRepository } from 'src/user/users.repository';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
  ) {
    super();
  }

  async getUser(id: string) {
    const userId = parseInt(id);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('There is no User in DB');

    return user;
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

        this.getUser(payload.userId).then((user) => {
          request.user = user;
        });

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
  ): TUser {
    if (err) {
      throw new UnauthorizedException('AUTH', 'JWT AUTH ERROR');
    }
    if (info) {
      const request = context.switchToHttp().getRequest();
      const refreshToken = request.cookies.RefreshToken.replace('Bearer ', '');

      this.authService
        .isRefreshTokenExpired(refreshToken)
        .then((verifiedRefreshToken) => {
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

          return this.authService
            .generateAccessToken(user.userId)
            .then((newAccessToken) => {
              // 새로운 액세스 토큰을 쿠키로 저장
              context
                .switchToHttp()
                .getResponse()
                .cookie('AccessToken', 'Bearer ' + newAccessToken);

              this.getUser(user.userId + '').then((user) => {
                request.user = user;
              });
              console.log('신규리프레시토큰', refreshToken);
              return refreshToken;
            })
            .catch((e) => {
              console.error(e);
            });
        });
    }
    return user;
  }
}
