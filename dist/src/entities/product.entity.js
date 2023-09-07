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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const store_product_entity_1 = require("./store_product.entity");
const paymentDetail_entity_1 = require("./paymentDetail.entity");
const common_entity_1 = require("./common.entity");
const category_entity_1 = require("./category.entity");
const review_entity_1 = require("./review.entity");
const discout_entity_1 = require("./discout.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let Product = exports.Product = class Product extends common_entity_1.CommonEntity {
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '30000',
        description: '상품 가격',
        required: true,
    }),
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '두혁위스키',
        description: '상품 이름',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '2',
        description: 'categoryId',
        required: true,
    }),
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '200',
        description: '상품 재고',
        required: true,
    }),
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Product.prototype, "totalStock", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: '이거는 술이야 술술 들어가는 술이야',
        description: '상품 설명',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        example: 'url',
        description: '상품 이미지',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_product_entity_1.Store_Product, (store_product) => store_product.product),
    __metadata("design:type", Array)
], Product.prototype, "store_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paymentDetail_entity_1.PaymentDetail, (paymentDetail) => paymentDetail.product),
    __metadata("design:type", Array)
], Product.prototype, "paymentDetail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => discout_entity_1.Discount, (discount) => discount.product),
    __metadata("design:type", discout_entity_1.Discount)
], Product.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.product),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "review", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'product' })
], Product);
//# sourceMappingURL=product.entity.js.map