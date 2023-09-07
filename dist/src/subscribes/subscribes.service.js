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
exports.SubscribesService = void 0;
const common_1 = require("@nestjs/common");
const subscribes_repository_1 = require("./subscribes.repository");
let SubscribesService = exports.SubscribesService = class SubscribesService {
    constructor(subscribesRepository) {
        this.subscribesRepository = subscribesRepository;
    }
    async postSubscribe(userId, isPaid, address) {
        const getSubscribeData = await this.subscribesRepository.getSubscribe(userId);
        if (getSubscribeData != null) {
            throw new common_1.NotFoundException('이미 구독 중입니다.');
        }
        const postSubscribeData = await this.subscribesRepository.postSubscribe(userId, isPaid, address);
        return postSubscribeData;
    }
    async getSubscribe(userId) {
        const getSubscribeData = await this.subscribesRepository.getSubscribe(userId);
        return getSubscribeData;
    }
    async updateSubscribe(userId, isPaid, address) {
        const updateSubscribeData = await this.subscribesRepository.updateSubscribe(userId, isPaid, address);
        return updateSubscribeData;
    }
    async deleteSubscribe(userId) {
        const deletesubscribeData = await this.subscribesRepository.deleteSubscribe(userId);
        return deletesubscribeData;
    }
};
exports.SubscribesService = SubscribesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscribes_repository_1.SubscribesRepository])
], SubscribesService);
//# sourceMappingURL=subscribes.service.js.map