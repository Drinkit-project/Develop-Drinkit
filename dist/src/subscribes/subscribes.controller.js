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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subscribes_service_1 = require("./subscribes.service");
const subscribes_request_dto_1 = require("./dto/subscribes.request.dto");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const user_decorators_1 = require("../commons/decorators/user.decorators");
let SubscribesController = exports.SubscribesController = class SubscribesController {
    constructor(subscribesService) {
        this.subscribesService = subscribesService;
    }
    async postSubscribe(user, dto) {
        const postSubscribeData = await this.subscribesService.postSubscribe(user.id, dto.isPaid, dto.address);
        return postSubscribeData;
    }
    async getSubscribe(user) {
        const getSubscribeData = await this.subscribesService.getSubscribe(user.id);
        return getSubscribeData;
    }
    async updateSubscribe(user, dto) {
        const postSubscribeData = await this.subscribesService.updateSubscribe(user.id, dto.isPaid, dto.address);
        return postSubscribeData;
    }
    async deleteSubscribe(user) {
        const deleteSubscribeData = await this.subscribesService.deleteSubscribe(user.id);
        return deleteSubscribeData;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구독 하기' }),
    (0, common_1.Post)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscribes_request_dto_1.SubscribesReqDto]),
    __metadata("design:returntype", Promise)
], SubscribesController.prototype, "postSubscribe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구독 상태확인' }),
    (0, common_1.Get)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribesController.prototype, "getSubscribe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구독 상태변경' }),
    (0, common_1.Put)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, subscribes_request_dto_1.SubscribesReqDto]),
    __metadata("design:returntype", Promise)
], SubscribesController.prototype, "updateSubscribe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '구독 취소' }),
    (0, common_1.Delete)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribesController.prototype, "deleteSubscribe", null);
exports.SubscribesController = SubscribesController = __decorate([
    (0, swagger_1.ApiTags)('subscribes'),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Controller)('subscribes'),
    __metadata("design:paramtypes", [subscribes_service_1.SubscribesService])
], SubscribesController);
//# sourceMappingURL=subscribes.controller.js.map