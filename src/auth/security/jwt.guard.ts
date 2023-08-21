import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.Authentication.replace('Bearer ', ''); // Remove 'Bearer ' from the token

    if (!token) {
      throw new UnauthorizedException('Token not found in the cookie.');
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
      request.payload = decodedToken; // Store the decoded payload in the request object

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
