"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./security/jwt.strategy");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const config_1 = require("@nestjs/config");
const jwt_config_service_1 = require("../../config/jwt.config.service");
const profiles_service_1 = require("../user/profiles.service");
const profiles_repository_1 = require("../user/profiles.repository");
const users_module_1 = require("../user/users.module");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useClass: jwt_config_service_1.JwtConfigService,
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        ],
        exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        providers: [
            profiles_service_1.ProfilesService,
            profiles_repository_1.ProfilesRepository,
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_config_service_1.JwtConfigService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map