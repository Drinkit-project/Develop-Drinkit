import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let accessToken: any;

    try {
      accessToken = request.cookies.AccessToken.replace('Bearer ', '');
    } catch (error) {
      throw new UnauthorizedException('Token not found in the cookie.');
    }

    try {
      const payload: any = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_ACCESS,
      );

      const myuser = await this.usersService.findByFields({
        where: { id: payload.userId },
      });
      request.myUser = myuser;

      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        request.response = context.switchToHttp().getResponse();
        await super.canActivate(context);
        return true;
      }

      throw new UnauthorizedException('Invalid Token');
    }
  }

  handleRequest(err: any, info: any): any {
    if (err) {
      throw new UnauthorizedException(err.message);
    }

    if (info) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }
  }
}
