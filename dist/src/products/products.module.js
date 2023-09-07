"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const products_repository_1 = require("./products.repository");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../entities/product.entity");
const category_entity_1 = require("../entities/category.entity");
const review_entity_1 = require("../entities/review.entity");
const store_product_entity_1 = require("../entities/store_product.entity");
const discout_entity_1 = require("../entities/discout.entity");
const discounts_service_1 = require("./discounts/discounts.service");
const discounts_repository_1 = require("./discounts/discounts.repository");
const discounts_controller_1 = require("./discounts/discounts.controller");
const open_search_service_1 = require("../open-search/open-search.service");
const user_entity_1 = require("../entities/user.entity");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../user/users.module");
const category_controler_1 = require("./category/category.controler");
const category_service_1 = require("./category/category.service");
const category_repository_1 = require("./category/category.repository");
let ProductsModule = exports.ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                product_entity_1.Product,
                discout_entity_1.Discount,
                category_entity_1.Category,
                review_entity_1.Review,
                user_entity_1.User,
                store_product_entity_1.Store_Product,
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [products_controller_1.ProductsController, category_controler_1.CategoryController, discounts_controller_1.DiscountsController],
        providers: [
            products_service_1.ProductsService,
            products_repository_1.ProductsRepository,
            discounts_service_1.DiscountsService,
            discounts_repository_1.DiscountsRepository,
            category_service_1.CategoryService,
            category_repository_1.CategoryRepository,
            open_search_service_1.OpenSearchService,
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map