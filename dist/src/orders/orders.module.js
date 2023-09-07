"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("./orders.service");
const paymentDetails_repository_1 = require("./paymentDetails.repository");
const paymentLogs_repository_1 = require("./paymentLogs.repository");
const typeorm_1 = require("@nestjs/typeorm");
const paymentDetail_entity_1 = require("../entities/paymentDetail.entity");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
const store_entity_1 = require("../entities/store.entity");
const store_product_entity_1 = require("../entities/store_product.entity");
const products_repository_1 = require("../products/products.repository");
const stores_repository_1 = require("../stores/stores.repository");
const users_module_1 = require("../user/users.module");
const auth_module_1 = require("../auth/auth.module");
const redis_module_1 = require("../redis/redis.module");
const store_product_repository_1 = require("../stores/store_product.repository");
let OrdersModule = exports.OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                paymentDetail_entity_1.PaymentDetail,
                paymentLog_entity_1.PaymentLog,
                user_entity_1.User,
                product_entity_1.Product,
                store_entity_1.Store,
                store_product_entity_1.Store_Product,
            ]),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            redis_module_1.RedisModule,
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_service_1.OrdersService,
            paymentDetails_repository_1.PaymentDetailRepository,
            paymentLogs_repository_1.PaymentLogRepository,
            products_repository_1.ProductsRepository,
            stores_repository_1.StoresRepository,
            store_product_repository_1.Store_ProductRepository,
        ],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map