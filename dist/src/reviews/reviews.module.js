"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const reviews_controller_1 = require("./reviews.controller");
const reviews_service_1 = require("./reviews.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const discout_entity_1 = require("../entities/discout.entity");
const user_entity_1 = require("../entities/user.entity");
const review_entity_1 = require("../entities/review.entity");
const reviews_repository_1 = require("./reviews.repository");
const paymentLog_entity_1 = require("../entities/paymentLog.entity");
const paymentDetail_entity_1 = require("../entities/paymentDetail.entity");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../user/users.module");
let ReviewsModule = exports.ReviewsModule = class ReviewsModule {
};
exports.ReviewsModule = ReviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.Product,
                paymentLog_entity_1.PaymentLog,
                paymentDetail_entity_1.PaymentDetail,
                discout_entity_1.Discount,
                review_entity_1.Review,
                user_entity_1.User,
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService, reviews_repository_1.ReviewsRepository],
    })
], ReviewsModule);
//# sourceMappingURL=reviews.module.js.map