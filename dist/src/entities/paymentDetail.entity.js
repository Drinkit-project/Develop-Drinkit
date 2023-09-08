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
exports.PaymentDetail = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const product_entity_1 = require("./product.entity");
const paymentLog_entity_1 = require("./paymentLog.entity");
const review_entity_1 = require("./review.entity");
let PaymentDetail = exports.PaymentDetail = class PaymentDetail extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentDetail.prototype, "paymentLogId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentDetail.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.paymentDetail),
    (0, typeorm_1.JoinColumn)([{ name: 'productId', referencedColumnName: 'id' }]),
    __metadata("design:type", product_entity_1.Product)
], PaymentDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paymentLog_entity_1.PaymentLog, (paymentLog) => paymentLog.paymentDetail),
    (0, typeorm_1.JoinColumn)([{ name: 'paymentLogId', referencedColumnName: 'id' }]),
    __metadata("design:type", paymentLog_entity_1.PaymentLog)
], PaymentDetail.prototype, "paymentLog", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => review_entity_1.Review, (review) => review.paymentDetail),
    __metadata("design:type", review_entity_1.Review)
], PaymentDetail.prototype, "review", void 0);
exports.PaymentDetail = PaymentDetail = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'paymentDetail' })
], PaymentDetail);
//# sourceMappingURL=paymentDetail.entity.js.map