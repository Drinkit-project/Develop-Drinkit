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
exports.UpdateProductDTO = exports.UpdateStoreDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const store_entity_1 = require("../../entities/store.entity");
const store_product_entity_1 = require("../../entities/store_product.entity");
const typeorm_1 = require("typeorm");
class UpdateStoreDTO extends (0, swagger_1.OmitType)(store_entity_1.Store, ['id', 'businessLicense']) {
}
exports.UpdateStoreDTO = UpdateStoreDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '서울 강남구 역삼로 123-45, 드링킷 Corp',
        name: 'address',
        description: 'Address where it is.',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateStoreDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'Drink!t Store 1호점',
        name: 'name',
        description: 'Store name what it is.',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateStoreDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '드링킷 1호점입니다. 방문시 다양한 주류를 확인하실 수 있습니다.',
        name: 'description',
        description: 'Description for store',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateStoreDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        name: 'userId',
        description: '매장 점주 ID',
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateStoreDTO.prototype, "userId", void 0);
class UpdateProductDTO extends (0, swagger_1.OmitType)(store_product_entity_1.Store_Product, [
    'id',
    'storeStock',
    'productId',
]) {
}
exports.UpdateProductDTO = UpdateProductDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        name: 'updateStock',
        description: 'To update Stock of product on store',
    }),
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], UpdateProductDTO.prototype, "updateStock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        name: 'upDown',
        description: '"true" means add and "false" means sub',
    }),
    (0, typeorm_1.Column)({
        type: 'boolean',
    }),
    __metadata("design:type", Boolean)
], UpdateProductDTO.prototype, "upDown", void 0);
//# sourceMappingURL=update.DTO.js.map