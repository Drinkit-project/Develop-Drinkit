"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribesModule = void 0;
const common_1 = require("@nestjs/common");
const subscribes_controller_1 = require("./subscribes.controller");
const subscribes_service_1 = require("./subscribes.service");
const subscribe_entity_1 = require("../entities/subscribe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const subscribes_repository_1 = require("./subscribes.repository");
const users_module_1 = require("../user/users.module");
const auth_module_1 = require("../auth/auth.module");
const profile_entity_1 = require("../entities/profile.entity");
let SubscribesModule = exports.SubscribesModule = class SubscribesModule {
};
exports.SubscribesModule = SubscribesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subscribe_entity_1.Subscribe]),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            profile_entity_1.Profile,
        ],
        controllers: [subscribes_controller_1.SubscribesController],
        providers: [subscribes_service_1.SubscribesService, subscribes_repository_1.SubscribesRepository],
    })
], SubscribesModule);
//# sourceMappingURL=subscribes.module.js.map