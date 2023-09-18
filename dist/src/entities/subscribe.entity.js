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
exports.Subscribe = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_entity_1 = require("./common.entity");
const swagger_1 = require("@nestjs/swagger");
let Subscribe = exports.Subscribe = class Subscribe extends (0, swagger_1.PickType)(common_entity_1.CommonEntity, [
    'createdAt',
    'updatedAt',
]) {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint', name: 'userId' }),
    __metadata("design:type", Number)
], Subscribe.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], Subscribe.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Subscribe.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.subscribe),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", user_entity_1.User)
], Subscribe.prototype, "user", void 0);
exports.Subscribe = Subscribe = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'subscribe' })
], Subscribe);
//# sourceMappingURL=subscribe.entity.js.map