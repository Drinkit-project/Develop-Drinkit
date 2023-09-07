"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../user/users.service");
const auth_service_1 = require("../auth.service");
let JwtStrategy = exports.JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(usersService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies['RefreshToken'].split(' ')[1];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_REFRESH,
            passReqToCallback: true,
        });
        this.usersService = usersService;
        this.authService = authService;
    }
    async validate(request, payload) {
        try {
            const refreshToken = request.cookies.RefreshToken.replace('Bearer ', '');
            const user = await this.usersService.tokenValidateUser(payload);
            if (!user) {
                throw new common_1.UnauthorizedException('존재하지 않는 사용자 입니다.');
            }
            if (!this.authService.isRefreshTokenValid(refreshToken, payload.userId)) {
                throw new common_1.UnauthorizedException('유효하지 않은 요청입니다. 관리자에게 문의하세요');
            }
            const accessToken = await this.authService.generateAccessToken(payload.userId, payload.nickname);
            request.response.cookie('AccessToken', 'Bearer ' + accessToken);
            const myuser = await this.usersService.findByFields({
                where: { id: payload.userId },
            });
            request.myUser = myuser;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('다시 로그인 해주세요');
        }
    }
};
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map