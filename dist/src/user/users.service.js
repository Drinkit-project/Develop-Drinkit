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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth/auth.service");
const profiles_service_1 = require("./profiles.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(dataSource, profilesService, authService, usersRepository) {
        this.dataSource = dataSource;
        this.profilesService = profilesService;
        this.authService = authService;
        this.usersRepository = usersRepository;
    }
    async findByFields(options) {
        return await this.usersRepository.findUser(options);
    }
    async findByFieldsForSignIn(options) {
        return await this.usersRepository.findUserForSignIn(options);
    }
    async transformPassword(password) {
        const transformedPassword = await bcrypt.hash(password, 10);
        return transformedPassword;
    }
    async sendEmail(email) {
        const isUserExist = await this.findByFields({
            where: { email },
        });
        if (isUserExist) {
            throw new common_1.UnauthorizedException('이미 존재하는 사용자 입니다.');
        }
        return await this.authService.sendVerificationEmail(email);
    }
    async sendSMS(phoneNumber) {
        const isUserExist = await this.profilesService.findByFields({
            where: { phoneNumber },
        });
        if (isUserExist) {
            throw new common_1.UnauthorizedException('이미 존재하는 사용자 입니다.');
        }
        return await this.authService.sendSMS(phoneNumber);
    }
    async authEmail(emailToken) {
        return await this.authService.verifyVerificationCode(emailToken);
    }
    async authCode(body) {
        const { phoneNumber, code } = body;
        try {
            const redisCode = await this.authService.authCode(phoneNumber);
            if (redisCode === code) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async signIn(data) {
        const { email, password } = data;
        const user = await this.findByFieldsForSignIn({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('email 또는 password를 확인해주세요.');
        }
        const isPasswordValidated = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) {
            throw new common_1.UnauthorizedException('email 또는 password를 확인해주세요.');
        }
        const accessToken = await this.authService.generateAccessToken(user.id, user.nickname);
        const refreshToken = await this.authService.generateRefreshToken(user.id, user.nickname);
        return { accessToken, refreshToken };
    }
    async oAuthSignIn({ request, response }) {
        const user = await this.findByFieldsForSignIn({
            where: { email: request.user.email },
        });
        if (!user) {
            console.log('ㅇㅇ');
            response.cookie(`email`, request.user.email, {
                secure: true,
                sameSite: 'none',
                domain: 'othwan.shop',
            });
            return false;
        }
        const accessToken = await this.authService.generateAccessToken(user.id, user.nickname);
        const refreshToken = await this.authService.generateRefreshToken(user.id, user.nickname);
        return { accessToken, refreshToken };
    }
    async signUp(data, email) {
        const { password, confirm, isAdmin, isPersonal, address, phoneNumber, nickname, name, } = data;
        if (password !== confirm) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        const hashedPassword = await this.transformPassword(password);
        return await this.dataSource.transaction(async (manager) => {
            const result = await manager
                .createQueryBuilder()
                .insert()
                .into(user_entity_1.User, [
                'email',
                'password',
                'isAdmin',
                'isPersonal',
                'name',
                'point',
            ])
                .values({
                email,
                password: hashedPassword,
                isAdmin,
                isPersonal,
                point: 0,
            })
                .execute();
            const [user] = result.identifiers;
            await this.profilesService.createProfile(user.id, address, phoneNumber, nickname, name, manager);
        });
    }
    async authenticationByPassword(id, password) {
        const user = await this.findByFields({
            where: { id },
        });
        const isPasswordValidated = await bcrypt.compare(password, user.password);
        if (isPasswordValidated)
            return true;
        else
            return false;
    }
    async updateUserPassword(id, data) {
        const { newPassword, confirm } = data;
        if (newPassword !== confirm) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        const user = await this.findByFields({
            where: { id },
        });
        const isPasswordValidated = await bcrypt.compare(newPassword, user.password);
        if (isPasswordValidated) {
            throw new common_1.UnauthorizedException('현재와 같은 비밀번호 입니다.');
        }
        const hashedPassword = await this.transformPassword(newPassword);
        await this.usersRepository.update({ id }, {
            password: hashedPassword,
        });
        return {
            statusCode: 201,
            message: '비밀번호 수정 성공',
        };
    }
    async tokenValidateUser(payload) {
        return await this.findByFields({
            where: { id: payload.userId },
        });
    }
    async deleteUser(id) {
        const user = await this.findByFields({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('존재하지 않는 사용자 입니다.');
        }
        await this.usersRepository.softDelete(id);
        return {
            statusCode: 201,
            message: '회원정보 삭제 성공',
        };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __param(3, (0, typeorm_2.InjectRepository)(users_repository_1.UsersRepository)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        profiles_service_1.ProfilesService,
        auth_service_1.AuthService,
        users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map