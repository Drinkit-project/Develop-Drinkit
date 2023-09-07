import { CreateReviewsRequestDto, UpdateReviewsRequestDto } from './dto/reviews.request.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviewByProductId(query: any): Promise<any[]>;
    createReview(user: any, query: any, body: CreateReviewsRequestDto): Promise<string>;
    updateReview(user: any, param: any, body: UpdateReviewsRequestDto): Promise<string>;
    removeReview(user: any, param: any): Promise<string>;
}
