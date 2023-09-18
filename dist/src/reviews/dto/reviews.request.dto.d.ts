import { Review } from 'src/entities/review.entity';
declare const CreateReviewsRequestDto_base: import("@nestjs/common").Type<Pick<Review, "content" | "rating">>;
export declare class CreateReviewsRequestDto extends CreateReviewsRequestDto_base {
}
export declare class UpdateReviewsRequestDto {
    content: string;
    rating: number;
}
export {};
