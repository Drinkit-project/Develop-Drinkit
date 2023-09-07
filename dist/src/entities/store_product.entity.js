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
exports.Store_Product = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("./store.entity");
const product_entity_1 = require("./product.entity");
const common_entity_1 = require("./common.entity");
const swagger_1 = require("@nestjs/swagger");
let Store_Product = exports.Store_Product = class Store_Product extends common_entity_1.CommonEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        name: 'storeId',
        description: 'ID of store',
    }),
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Store_Product.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        name: 'productId',
        description: 'ID of product',
    }),
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Store_Product.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        name: 'storeStock',
        description: 'Stock of product on store',
    }),
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], Store_Product.prototype, "storeStock", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.Store, (store) => store.productList),
    (0, typeorm_1.JoinColumn)([{ name: 'storeId', referencedColumnName: 'id' }]),
    __metadata("design:type", store_entity_1.Store)
], Store_Product.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.store_product),
    (0, typeorm_1.JoinColumn)([{ name: 'productId', referencedColumnName: 'id' }]),
    __metadata("design:type", product_entity_1.Product)
], Store_Product.prototype, "product", void 0);
exports.Store_Product = Store_Product = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'store_product' })
], Store_Product);
//# sourceMappingURL=store_product.entity.js.map