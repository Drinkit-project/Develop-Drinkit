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
exports.Store_ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const store_product_entity_1 = require("../entities/store_product.entity");
const typeorm_1 = require("typeorm");
let Store_ProductRepository = exports.Store_ProductRepository = class Store_ProductRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(store_product_entity_1.Store_Product, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getProductDetailByStoreIdAndProductId(storeId, productId) {
        const foundStoreProduct = await this.createQueryBuilder('store_product')
            .leftJoinAndSelect('store_product.product', 'product')
            .where('store_product.storeId = :storeId', { storeId })
            .andWhere('store_product.productId = :productId', { productId })
            .getOne();
        return foundStoreProduct;
    }
    addProductOnStore(obj) {
        const product = this.createQueryBuilder('store_product')
            .insert()
            .into(store_product_entity_1.Store_Product)
            .values(obj)
            .execute();
        return product;
    }
    async updateProductStock(data) {
        return;
    }
};
exports.Store_ProductRepository = Store_ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], Store_ProductRepository);
//# sourceMappingURL=store_product.repository.js.map