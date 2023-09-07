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
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const store_product_entity_1 = require("./store_product.entity");
const common_entity_1 = require("./common.entity");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let Store = exports.Store = class Store extends common_entity_1.CommonEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '서울 강남구 역삼로 123-45, 드링킷 Corp',
        name: 'address',
        description: 'Address where it is.',
        required: true,
    }),
    (0, swagger_1.ApiProperty)({
        example: 'Drink!t Store 1호점',
        name: 'name',
        description: 'Store name what it is.',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '드링킷 1호점입니다. 방문시 다양한 주류를 확인하실 수 있습니다.',
        name: 'description',
        description: 'Description for store',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Store.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123-98-45678',
        name: 'businessLicense',
        description: '사업자 등록증 번호',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 12,
    }),
    __metadata("design:type", String)
], Store.prototype, "businessLicense", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'imgUrls',
        description: '매장 사진',
        required: false,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 65535,
        default: '[]',
    }),
    __metadata("design:type", String)
], Store.prototype, "imgUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userId',
        description: '매장 점주 ID',
        required: true,
    }),
    (0, typeorm_1.Column)({
        type: 'integer',
        unique: true,
    }),
    __metadata("design:type", Number)
], Store.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Store.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], Store.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.store),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", user_entity_1.User)
], Store.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => store_product_entity_1.Store_Product, (store_product) => store_product.store),
    __metadata("design:type", Array)
], Store.prototype, "productList", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'store' })
], Store);
//# sourceMappingURL=store.entity.js.map