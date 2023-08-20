import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Discount } from 'src/entities/discout.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiscountsRepository extends Repository<Discount> {
  constructor(private datasource: DataSource) {
    super(Discount, datasource.createEntityManager());
  }

  async createDiscount(
    productId,
    discountPrice,
    discountRating,
    startDate,
    endDate,
  ) {
    try {
      const createdDiscount = await this.createQueryBuilder()
        .insert()
        .into(Discount)
        .values({
          productId,
          discountPrice,
          discountRating,
          startDate,
          endDate,
        })
        .execute();
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('이미 해당 상품에 할인이 존재합니다.');
      }
      throw new InternalServerErrorException('디비에러');
    }
  }
}
