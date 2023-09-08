"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const reviews_module_1 = require("./reviews/reviews.module");
const stores_module_1 = require("./stores/stores.module");
const orders_module_1 = require("./orders/orders.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_service_1 = require("../config/typeorm.config.service");
const users_module_1 = require("./user/users.module");
const subscribes_module_1 = require("./subscribes/subscribes.module");
const redis_module_1 = require("./redis/redis.module");
const open_search_module_1 = require("./open-search/open-search.module");
const cron_module_1 = require("./cron/cron.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    store: cache_manager_redis_store_1.redisStore,
                    url: configService.get('REDIS_URL'),
                    ttl: 0,
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            reviews_module_1.ReviewsModule,
            stores_module_1.StoresModule,
            orders_module_1.OrdersModule,
            users_module_1.UsersModule,
            subscribes_module_1.SubscribesModule,
            redis_module_1.RedisModule,
            open_search_module_1.OpenSearchModule,
            cron_module_1.CronModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map