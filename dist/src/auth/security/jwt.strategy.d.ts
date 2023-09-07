import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/user/users.service';
import { AuthService } from '../auth.service';
import { Payload } from './payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    validate(request: any, payload: Payload): Promise<void>;
}
export {};
