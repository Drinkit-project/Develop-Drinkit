import { Injectable } from '@nestjs/common';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { Product } from 'src/entities/product.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

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
      .getRawMany();
    return getOrdersDetailData;
  }

  async postPaymentDetail(
    paymentDetailArray: Array<{
      productId: number;
      paymentLogId: number;
      count: number;
    }>,
    manager: EntityManager,
  ) {
    const postPaymentDetailData = await manager
      .createQueryBuilder()
      .insert()
      .into(PaymentDetail)
      .values(paymentDetailArray)
      .execute();

    return postPaymentDetailData;
  }

  async getOrderDetail(paymentLogId: number) {
    const getOrderDetailData = await this.createQueryBuilder()
      .where('paymentLogId = :paymentLogId', { paymentLogId })
      .getMany();
    return getOrderDetailData;
  }
}
