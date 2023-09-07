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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const common_entity_1 = require("./common.entity");
const paymentLog_entity_1 = require("./paymentLog.entity");
const review_entity_1 = require("./review.entity");
const store_entity_1 = require("./store.entity");
const subscribe_entity_1 = require("./subscribe.entity");
const profile_entity_1 = require("./profile.entity");
let User = exports.User = class User extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], User.prototype, "isPersonal", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], User.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paymentLog_entity_1.PaymentLog, (paymentLog) => paymentLog.user),
    __metadata("design:type", Array)
], User.prototype, "paymentLog", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => store_entity_1.Store, (store) => store.user),
    __metadata("design:type", store_entity_1.Store)
], User.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => subscribe_entity_1.Subscribe, (subscribe) => subscribe.user),
    __metadata("design:type", subscribe_entity_1.Subscribe)
], User.prototype, "subscribe", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile, (profile) => profile.user),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.user),
    __metadata("design:type", Array)
], User.prototype, "review", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'user' })
], User);
//# sourceMappingURL=user.entity.js.map