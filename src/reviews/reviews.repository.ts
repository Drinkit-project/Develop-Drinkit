import { Injectable } from '@nestjs/common';
import { Review } from 'src/entities/review.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReviewsRepository extends Repository<Review> {
  constructor(private dataSource: DataSource) {
    super(Review, dataSource.createEntityManager());
  }

  async getByProductId(productId) {
    const reviews = await this.createQueryBuilder('review')
      .where('review.productId = :productId', { productId })
      .getMany();

    return reviews;
  }
}
