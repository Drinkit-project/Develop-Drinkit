"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronModule = void 0;
const common_1 = require("@nestjs/common");
const cron_service_1 = require("./cron.service");
const schedule_1 = require("@nestjs/schedule");
const open_search_service_1 = require("../open-search/open-search.service");
const products_service_1 = require("../products/products.service");
const products_repository_1 = require("../products/products.repository");
const paymentLogs_repository_1 = require("../orders/paymentLogs.repository");
const paymentDetails_repository_1 = require("../orders/paymentDetails.repository");
const subscribes_repository_1 = require("../subscribes/subscribes.repository");
const orders_service_1 = require("../orders/orders.service");
const store_product_repository_1 = require("../stores/store_product.repository");
const stores_repository_1 = require("../stores/stores.repository");
const users_repository_1 = require("../user/users.repository");
const redis_service_1 = require("../redis/redis.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
let CronModule = exports.CronModule = class CronModule {
};
exports.CronModule = CronModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, paymentLog_entity_1.PaymentLog]),
        ],
        providers: [
            cron_service_1.CronService,
            open_search_service_1.OpenSearchService,
            products_service_1.ProductsService,
            orders_service_1.OrdersService,
            products_repository_1.ProductsRepository,
            paymentLogs_repository_1.PaymentLogRepository,
            subscribes_repository_1.SubscribesRepository,
            paymentDetails_repository_1.PaymentDetailRepository,
            store_product_repository_1.Store_ProductRepository,
            stores_repository_1.StoresRepository,
            redis_service_1.RedisService,
            users_repository_1.UsersRepository,
        ],
    })
], CronModule);
//# sourceMappingURL=cron.module.js.map