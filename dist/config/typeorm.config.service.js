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
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const product_entity_1 = require("../src/entities/product.entity");
const category_entity_1 = require("../src/entities/category.entity");
const discout_entity_1 = require("../src/entities/discout.entity");
const paymentDetail_entity_1 = require("../src/entities/paymentDetail.entity");
const paymentLog_entity_1 = require("../src/entities/paymentLog.entity");
const profile_entity_1 = require("../src/entities/profile.entity");
const review_entity_1 = require("../src/entities/review.entity");
const store_product_entity_1 = require("../src/entities/store_product.entity");
const store_entity_1 = require("../src/entities/store.entity");
const subscribe_entity_1 = require("../src/entities/subscribe.entity");
const user_entity_1 = require("../src/entities/user.entity");
let TypeOrmConfigService = exports.TypeOrmConfigService = class TypeOrmConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [
                product_entity_1.Product,
                category_entity_1.Category,
                discout_entity_1.Discount,
                paymentDetail_entity_1.PaymentDetail,
                paymentLog_entity_1.PaymentLog,
                profile_entity_1.Profile,
                review_entity_1.Review,
                store_product_entity_1.Store_Product,
                store_entity_1.Store,
                subscribe_entity_1.Subscribe,
                user_entity_1.User,
            ],
            logging: false,
            synchronize: this.configService.get('DATABASE_SYNCHRONIZE'),
            extra: {
                ssl: { rejectUnauthorized: false },
            },
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmConfigService);
//# sourceMappingURL=typeorm.config.service.js.map