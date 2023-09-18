"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_CALLBACK_URL,
            scope: ['account_email'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        return {
            email: profile._json.kakao_account.email,
        };
    }
}
exports.KakaoStrategy = KakaoStrategy;
//# sourceMappingURL=kakao.strategy.js.map