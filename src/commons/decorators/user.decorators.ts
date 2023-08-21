import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Payload } from 'src/auth/security/payload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.cookies.Authentication.replace('Bearer ', ''); // Remove 'Bearer ' from the token

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_ACCESS,
      ) as Payload;
      if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
);
