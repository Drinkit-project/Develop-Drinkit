import { Injectable } from '@nestjs/common';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { Product } from 'src/entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentDetailRepository extends Repository<PaymentDetail> {
  constructor(private datasource: DataSource) {
    super(PaymentDetail, datasource.createEntityManager());
  }

  async getOrdersDetail(paymentLogId: number) {
    const getOrdersDetailData = await this.createQueryBuilder('paymentDetail')
      .leftJoinAndSelect(
        Product,
        'product',
        'product.id = paymentDetail.productId',
      )
      .where('paymentLogId = :paymentLogId', { paymentLogId })
      .getRawOne();
    return getOrdersDetailData;
  }

  async postPaymentDetail(
    paymentDetailArray: Array<{ productId: number; paymentLogId: number }>,
  ) {
    const postPaymentDetailData = await this.createQueryBuilder()
      .insert()
      // .into(PaymentDetail)
      .values(paymentDetailArray)
      .execute();

    return postPaymentDetailData;
  }
}
