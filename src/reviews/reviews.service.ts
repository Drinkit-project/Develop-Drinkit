import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    private reviewsRepository: ReviewsRepository,
    @InjectRepository(PaymentDetail)
    private paymentDetailRepository: Repository<PaymentDetail>,
  ) {}

  private async checkPaymentAutherization(userId, paymentDetailId) {
    const myPayment = await this.paymentDetailRepository
      .createQueryBuilder('paymentDetail')
      .leftJoinAndSelect('paymentDetail.paymentLog', 'paymentLog')
      .where('paymentDetail.id = :paymentDetailId', { paymentDetailId })
      .getOne();

    if (!myPayment) {
      throw new NotFoundException('구매내역을 확인해주세요');
    }
    if (myPayment.paymentLog.userId !== userId) {
      throw new UnauthorizedException('해당 구매내역에 권한이 없습니다.');
    }
    return myPayment.productId;
  }

  private async checkReviewAutherization(userId, reviewId) {
    const myReview = await this.reviewsRepository
      .createQueryBuilder('review')
      .where('review.id = :reviewId', { reviewId })
      .getOne();

    if (!myReview) {
      throw new NotFoundException('구매내역을 확인해주세요');
    }
    if (myReview.userId !== userId) {
      throw new UnauthorizedException('해당 구매내역에 권한이 없습니다.');
    }
    return true;
  }

  async getByProductId(productId) {
    const reviews = await this.reviewsRepository.getByProductId(productId);

    return reviews;
  }

  async createReview(userId, paymentDetailId, content, rating) {
    const productId = await this.checkPaymentAutherization(
      userId,
      paymentDetailId,
    );

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
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('이미 리뷰가 등록되어 있습니다');
      }
      throw new BadGatewayException('서버오류');
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
    } catch (error) {
      throw new BadGatewayException('서버오류');
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
    } catch (error) {
      throw new BadGatewayException('서버오류');
    }
  }
}
