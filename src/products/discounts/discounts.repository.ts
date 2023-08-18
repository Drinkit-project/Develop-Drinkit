import { Injectable } from '@nestjs/common';
import { Discount } from 'src/entities/discout.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiscountsRepository extends Repository<Discount> {
  constructor(private datasource: DataSource) {
    super(Discount, datasource.createEntityManager());
  }

  async createDiscount(productId, newDiscount) {
    const createdDiscount = await this.createQueryBuilder();
  }
}
