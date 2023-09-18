import { Strategy } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, profile: any): {
        email: any;
    };
}
export {};
