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
exports.Discount = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const product_entity_1 = require("./product.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let Discount = exports.Discount = class Discount extends common_entity_1.CommonEntity {
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '20000',
        description: '할인 할 가격',
        required: false,
    }),
    (0, typeorm_1.Column)('bigint', { nullable: true }),
    __metadata("design:type", Number)
], Discount.prototype, "discountPrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        example: '30',
        description: '할인 할 할인율',
        required: false,
    }),
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Discount.prototype, "discountRating", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({
        example: '2',
        description: '할인을 시작하는 날',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", Date)
], Discount.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({
        example: '2',
        description: '할인이 끝나는 날',
        required: true,
    }),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", Date)
], Discount.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { unique: true }),
    __metadata("design:type", Number)
], Discount.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, (product) => product.discount),
    (0, typeorm_1.JoinColumn)([{ name: 'productId', referencedColumnName: 'id' }]),
    __metadata("design:type", product_entity_1.Product)
], Discount.prototype, "product", void 0);
exports.Discount = Discount = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'discount' })
], Discount);
//# sourceMappingURL=discout.entity.js.map