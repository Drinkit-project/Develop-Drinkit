import { Strategy } from 'passport-naver';
declare const NaverStrategy_base: new (...args: any[]) => Strategy;
export declare class NaverStrategy extends NaverStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): {
        email: any;
    };
}
export {};
