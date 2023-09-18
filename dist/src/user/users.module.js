"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const profiles_service_1 = require("./profiles.service");
const profile_entity_1 = require("../entities/profile.entity");
const profiles_repository_1 = require("./profiles.repository");
const auth_module_1 = require("../auth/auth.module");
const google_strategy_1 = require("../auth/security/google.strategy");
const kakao_strategy_1 = require("../auth/security/kakao.strategy");
const naver_starategy_1 = require("../auth/security/naver.starategy");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, profile_entity_1.Profile]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            profiles_service_1.ProfilesService,
            profiles_repository_1.ProfilesRepository,
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            google_strategy_1.GoogleStrategy,
            kakao_strategy_1.KakaoStrategy,
            naver_starategy_1.NaverStrategy,
        ],
        exports: [users_service_1.UsersService, users_repository_1.UsersRepository],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map