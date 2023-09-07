import { Review } from 'src/entities/review.entity';
import { DataSource, Repository } from 'typeorm';
export declare class ReviewsRepository extends Repository<Review> {
    private dataSource;
    constructor(dataSource: DataSource);
    getByProductId(productId: any): Promise<Review[]>;
}
