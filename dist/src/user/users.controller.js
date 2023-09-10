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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const passport_1 = require("@nestjs/passport");
const user_decorators_1 = require("../commons/decorators/user.decorators");
const users_service_1 = require("./users.service");
const profiles_service_1 = require("./profiles.service");
const createUser_dto_1 = require("./dto/createUser.dto");
const user_entity_1 = require("../entities/user.entity");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService, profilesService) {
        this.usersService = usersService;
        this.profilesService = profilesService;
    }
    async signUp(data) {
        return await this.usersService.signUp(data);
    }
    async sendSMS(body) {
        return await this.usersService.sendSMS(body.phoneNumber);
    }
    async authCode(response, body) {
        const isAuth = await this.usersService.authCode(body);
        if (isAuth) {
            return response.status(201).json({ message: '인증 성공' });
        }
        return response.status(401).json({ message: '인증 실패' });
    }
    async sendEmail(body) {
        return await this.usersService.sendEmail(body.email);
    }
    async authEmail(emailToken, response) {
        const email = await this.usersService.authEmail(emailToken);
        if (email) {
            response.cookie(`email`, email);
            return response.redirect('http://118.67.143.18:3200/signup');
        }
        else
            return response.status(400);
    }
    async signIn(data, response) {
        const tokens = await this.usersService.signIn(data);
        response.cookie('AccessToken', 'Bearer ' + tokens.accessToken, {
            secure: true,
            sameSite: 'none',
            domain: 'drinkit.site',
        });
        response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken, {
            secure: true,
            sameSite: 'none',
            domain: 'drinkit.site',
        });
        return response.json(tokens);
    }
    async loginGoogle(request, response) {
        const tokens = await this.usersService.oAuthSignIn({ request, response });
        if (!tokens)
            return response.redirect('http://118.67.143.18:3200/signup');
        response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
        response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);
        return response.redirect('http://118.67.143.18:3200');
    }
    async loginKakao(request, response) {
        const tokens = await this.usersService.oAuthSignIn({ request, response });
        if (!tokens)
            return response.redirect('http://118.67.143.18:3200/signup');
        response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
        response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);
        return response.redirect('http://118.67.143.18:3200');
    }
    async loginNaver(request, response) {
        const tokens = await this.usersService.oAuthSignIn({ request, response });
        if (!tokens)
            return response.redirect('http://118.67.143.18:3200/signup');
        response.cookie('AccessToken', 'Bearer ' + tokens.accessToken);
        response.cookie('RefreshToken', 'Bearer ' + tokens.refreshToken);
        return response.redirect('http://118.67.143.18:3200');
    }
    async signout(response) {
        response.clearCookie('AccessToken');
        response.clearCookie('RefreshToken');
        return response.status(200).send('signed out successfully');
    }
    async getUser(userId, data) {
        const userchecked = await this.usersService.authenticationByPassword(userId, data.password);
        return userchecked;
    }
    async updateUserPassword(userId, data) {
        return await this.usersService.updateUserPassword(userId, data);
    }
    async deleteUser(userId) {
        return await this.usersService.deleteUser(userId);
    }
    async getProfile(user) {
        const profile = await this.profilesService.getProfile(user.id);
        return profile;
    }
    async getAddress(user) {
        return await this.profilesService.getAddress(user.id);
    }
    updateProfile(user, data) {
        return this.profilesService.updateProfile(user.id, data);
    }
    addAddress(user, data) {
        return this.profilesService.addAddress(user.id, data);
    }
    updateAddress(user, addressIdx, data) {
        return this.profilesService.updateAddress(user.id, addressIdx, data);
    }
    delteAddress(user, addressIdx) {
        return this.profilesService.delteAddress(user.id, addressIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'sign-up' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.default]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/phoneAuth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendSMS", null);
__decorate([
    (0, common_1.Post)('/phoneCodeAuth'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authCode", null);
__decorate([
    (0, common_1.Post)('/emailAuth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('/emailTokenAuth'),
    __param(0, (0, common_1.Query)('emailToken')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'sign-in' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('/login/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Get)('/login/kakao'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginKakao", null);
__decorate([
    (0, common_1.Get)('/login/naver'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginNaver", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'sign-out' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)('/signOut'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Get)('/authenticate'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'update user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('/address'),
    (0, swagger_1.ApiOperation)({ summary: 'Get profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAddress", null);
__decorate([
    (0, common_1.Put)('/profile'),
    (0, swagger_1.ApiOperation)({ summary: 'update profile' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('/address'),
    (0, swagger_1.ApiOperation)({ summary: 'add address' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addAddress", null);
__decorate([
    (0, common_1.Patch)('/address'),
    (0, swagger_1.ApiOperation)({ summary: 'update address' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('addressIdx')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)('/address'),
    (0, swagger_1.ApiOperation)({ summary: 'delete address' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('addressIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delteAddress", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        profiles_service_1.ProfilesService])
], UsersController);
//# sourceMappingURL=users.controller.js.map