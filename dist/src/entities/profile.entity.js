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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const common_entity_1 = require("./common.entity");
let Profile = exports.Profile = class Profile extends (0, swagger_1.PickType)(common_entity_1.CommonEntity, [
    'createdAt',
    'updatedAt',
]) {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint', name: 'userId' }),
    __metadata("design:type", Number)
], Profile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", user_entity_1.User)
], Profile.prototype, "user", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)({ schema: '', name: 'profile' })
], Profile);
//# sourceMappingURL=profile.entity.js.map