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
exports.DiscountsService = void 0;
const common_1 = require("@nestjs/common");
const discounts_repository_1 = require("./discounts.repository");
let DiscountsService = exports.DiscountsService = class DiscountsService {
    constructor(discountsRepository) {
        this.discountsRepository = discountsRepository;
    }
    async createDiscount(productId, newDiscount) {
        const { discountPrice, discountRating, startDate, endDate } = newDiscount;
        if ((discountRating && discountPrice) ||
            (!discountPrice && !discountRating)) {
            throw new common_1.BadRequestException('할인 할 가격과 할인율 둘중 한가지를 선택해서 보내주세요.');
        }
        const createdDiscount = await this.discountsRepository.createDiscount(productId, discountPrice, discountRating, startDate, endDate);
        return createdDiscount;
    }
};
exports.DiscountsService = DiscountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [discounts_repository_1.DiscountsRepository])
], DiscountsService);
//# sourceMappingURL=discounts.service.js.map