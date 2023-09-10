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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt = require("jsonwebtoken");
const users_service_1 = require("../../user/users.service");
let AuthGuard = exports.AuthGuard = class AuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(usersService) {
        super();
        this.usersService = usersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let accessToken;
        try {
            accessToken = request.cookies.AccessToken.replace('Bearer ', '');
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token not found in the cookie.');
        }
        try {
            const payload = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS);
            const myuser = await this.usersService.findByFields({
                where: { id: payload.userId },
            });
            request.myUser = myuser;
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                request.response = context.switchToHttp().getResponse();
                await super.canActivate(context);
                return true;
            }
            throw new common_1.UnauthorizedException('Invalid Token');
        }
    }
    handleRequest(err, info) {
        if (err) {
            throw new common_1.UnauthorizedException(err.message);
        }
        if (info) {
            throw new common_1.UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
        }
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=jwt.guard.js.map