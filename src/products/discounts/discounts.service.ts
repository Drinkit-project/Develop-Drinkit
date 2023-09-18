import { BadRequestException, Injectable } from '@nestjs/common';
import { DiscountsRepository } from './discounts.repository';

@Injectable()
export class DiscountsService {
  constructor(private discountsRepository: DiscountsRepository) {}

  async createDiscount(productId, newDiscount) {
    const { discountPrice, discountRating, startDate, endDate } = newDiscount;

    if (
      (discountRating && discountPrice) ||
      (!discountPrice && !discountRating)
    ) {
      throw new BadRequestException(
        '할인 할 가격과 할인율 둘중 한가지를 선택해서 보내주세요.',
      );
    }

    const createdDiscount = await this.discountsRepository.createDiscount(
      productId,
      discountPrice,
      discountRating,
      startDate,
      endDate,
    );

    return createdDiscount;
  }
}
