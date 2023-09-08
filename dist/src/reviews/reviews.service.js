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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const reviews_repository_1 = require("./reviews.repository");
const paymentDetail_entity_1 = require("../entities/paymentDetail.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ReviewsService = exports.ReviewsService = class ReviewsService {
    constructor(reviewsRepository, paymentDetailRepository) {
        this.reviewsRepository = reviewsRepository;
        this.paymentDetailRepository = paymentDetailRepository;
    }
    async checkPaymentAutherization(userId, paymentDetailId) {
        const myPayment = await this.paymentDetailRepository
            .createQueryBuilder('paymentDetail')
            .leftJoinAndSelect('paymentDetail.paymentLog', 'paymentLog')
            .where('paymentDetail.id = :paymentDetailId', { paymentDetailId })
            .getOne();
        if (!myPayment) {
            throw new common_1.NotFoundException('구매내역을 확인해주세요');
        }
        if (myPayment.paymentLog.userId !== userId) {
            throw new common_1.UnauthorizedException('해당 구매내역에 권한이 없습니다.');
        }
        return myPayment.productId;
    }
    async checkReviewAutherization(userId, reviewId) {
        const myReview = await this.reviewsRepository
            .createQueryBuilder('review')
            .where('review.id = :reviewId', { reviewId })
            .getOne();
        if (!myReview) {
            console.log(myReview);
            throw new common_1.NotFoundException('구매내역을 확인해주세요');
        }
        if (myReview.userId !== userId) {
            throw new common_1.UnauthorizedException('해당 구매내역에 권한이 없습니다.');
        }
        return true;
    }
    async getByProductId(productId) {
        const reviews = await this.reviewsRepository.getByProductId(productId);
        return reviews;
    }
    async createReview(userId, paymentDetailId, content, rating) {
        const productId = await this.checkPaymentAutherization(userId, paymentDetailId);
        try {
            const createdReview = await this.reviewsRepository
                .createQueryBuilder('review')
                .insert()
                .values({
                userId,
                productId,
                content,
                rating,
                paymentDetailId,
            })
                .execute();
            return createdReview;
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.BadRequestException('이미 리뷰가 등록되어 있습니다');
            }
            throw new common_1.BadGatewayException('서버오류');
        }
    }
    async updateReview(userId, reviewId, content, rating) {
        await this.checkReviewAutherization(userId, reviewId);
        try {
            const updatedReview = await this.reviewsRepository
                .createQueryBuilder('review')
                .update()
                .set({
                content,
                rating,
            })
                .where('id = :reviewId', { reviewId })
                .execute();
            return updatedReview;
        }
        catch (error) {
            throw new common_1.BadGatewayException('서버오류');
        }
    }
    async removeReview(userId, reviewId) {
        await this.checkReviewAutherization(userId, reviewId);
        try {
            const removedReview = await this.reviewsRepository
                .createQueryBuilder('review')
                .delete()
                .where('id = :reviewId', { reviewId })
                .execute();
            return removedReview;
        }
        catch (error) {
            throw new common_1.BadGatewayException('서버오류');
        }
    }
};
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(paymentDetail_entity_1.PaymentDetail)),
    __metadata("design:paramtypes", [reviews_repository_1.ReviewsRepository,
        typeorm_1.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map