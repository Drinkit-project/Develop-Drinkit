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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/security/jwt.guard");
const user_decorators_1 = require("../commons/decorators/user.decorators");
const reviews_request_dto_1 = require("./dto/reviews.request.dto");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = exports.ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getReviewByProductId(query) {
        const { productId } = query;
        let reviews = [];
        reviews = await this.reviewsService.getByProductId(productId);
        return reviews;
    }
    async createReview(user, query, body) {
        const { paymentDetailId } = query;
        const { content, rating } = body;
        const newProduct = await this.reviewsService.createReview(user.id, paymentDetailId, content, rating);
        return '리뷰 등록 완료!';
    }
    async updateReview(user, param, body) {
        const { reviewId } = param;
        const { content, rating } = body;
        const newProduct = await this.reviewsService.updateReview(user.id, reviewId, content, rating);
        return '리뷰 수정 완료!';
    }
    async removeReview(user, param) {
        const { reviewId } = param;
        const newProduct = await this.reviewsService.removeReview(user.id, reviewId);
        return '리뷰 삭제 완료!';
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '상품 리뷰내역 조회' }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviewByProductId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 등록' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reviews_request_dto_1.CreateReviewsRequestDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 수정' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Put)(':reviewId'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reviews_request_dto_1.UpdateReviewsRequestDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateReview", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '리뷰 삭제' }),
    (0, common_1.UseGuards)(jwt_guard_1.AuthGuard),
    (0, common_1.Delete)(':reviewId'),
    __param(0, (0, user_decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "removeReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map