import { ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
declare const AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthGuard extends AuthGuard_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    handleRequest(err: any, info: any): any;
}
export {};
