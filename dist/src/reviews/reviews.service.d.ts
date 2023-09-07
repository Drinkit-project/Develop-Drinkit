import { ReviewsRepository } from './reviews.repository';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { Repository } from 'typeorm';
export declare class ReviewsService {
    private reviewsRepository;
    private paymentDetailRepository;
    constructor(reviewsRepository: ReviewsRepository, paymentDetailRepository: Repository<PaymentDetail>);
    private checkPaymentAutherization;
    private checkReviewAutherization;
    getByProductId(productId: any): Promise<import("../entities/review.entity").Review[]>;
    createReview(userId: any, paymentDetailId: any, content: any, rating: any): Promise<import("typeorm").InsertResult>;
    updateReview(userId: any, reviewId: any, content: any, rating: any): Promise<import("typeorm").UpdateResult>;
    removeReview(userId: any, reviewId: any): Promise<import("typeorm").DeleteResult>;
}
