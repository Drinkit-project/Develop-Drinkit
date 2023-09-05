import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.myUser;
  },
);

export const AdminUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.myUser.isAdmin) throw new BadRequestException('권한 없음');
    console.log(request.myUser);
    return request.myUser;
  },
);

export const PersonalUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.myUser.isPersonal) throw new BadRequestException('권한 없음');

    return request.myUser;
  },
);
