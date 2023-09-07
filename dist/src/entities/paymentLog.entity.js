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
exports.PaymentLog = exports.PaymentStatus = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const user_entity_1 = require("./user.entity");
const paymentDetail_entity_1 = require("./paymentDetail.entity");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["ORDER_PENDING"] = "\uC8FC\uBB38\uD655\uC778\uC911";
    PaymentStatus["READY"] = "\uC0C1\uD488\uC900\uBE44\uC911";
    PaymentStatus["READY_COMPLETE"] = "\uC0C1\uD488\uC900\uBE44\uC644\uB8CC";
    PaymentStatus["DELIVERY"] = "\uBC30\uC1A1\uC911";
    PaymentStatus["PICKUP"] = "\uD53D\uC5C5\uC911";
    PaymentStatus["COMPLETE"] = "\uC644\uB8CC";
    PaymentStatus["WAIT_CANCELL"] = "\uCDE8\uC18C\uB300\uAE30";
    PaymentStatus["CANCELLED"] = "\uCDE8\uC18C";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
let PaymentLog = exports.PaymentLog = class PaymentLog extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentLog.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PaymentStatus }),
    __metadata("design:type", String)
], PaymentLog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentLog.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentLog.prototype, "storeId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], PaymentLog.prototype, "paidPoint", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], PaymentLog.prototype, "impUid", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], PaymentLog.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.paymentLog),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", user_entity_1.User)
], PaymentLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paymentDetail_entity_1.PaymentDetail, (paymentDetail) => paymentDetail.paymentLog),
    __metadata("design:type", Array)
], PaymentLog.prototype, "paymentDetail", void 0);
exports.PaymentLog = PaymentLog = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'paymentLog' })
], PaymentLog);
//# sourceMappingURL=paymentLog.entity.js.map