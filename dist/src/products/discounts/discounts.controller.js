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
exports.DiscountsController = void 0;
const swagger_1 = require("@nestjs/swagger");
const discounts_service_1 = require("./discounts.service");
const common_1 = require("@nestjs/common");
const discounts_request_dto_1 = require("./dto/discounts.request.dto");
let DiscountsController = exports.DiscountsController = class DiscountsController {
    constructor(discountsService) {
        this.discountsService = discountsService;
    }
    async createDiscount(param, body) {
        const { productId } = param;
        if (!body['startDate'] && !body['endDate']) {
            throw new common_1.BadRequestException('시작과 마지막 날을 확인해주세요');
        }
        const createdDiscount = await this.discountsService.createDiscount(productId, body);
        return { message: `할인 적용완료!` };
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 할인 적용' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, discounts_request_dto_1.CreateDiscountRequestDto]),
    __metadata("design:returntype", Promise)
], DiscountsController.prototype, "createDiscount", null);
exports.DiscountsController = DiscountsController = __decorate([
    (0, common_1.Controller)('products/:productId/discount'),
    __metadata("design:paramtypes", [discounts_service_1.DiscountsService])
], DiscountsController);
//# sourceMappingURL=discounts.controller.js.map