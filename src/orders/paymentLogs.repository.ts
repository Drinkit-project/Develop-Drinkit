import { Injectable } from '@nestjs/common';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentLogRepository extends Repository<PaymentLog> {
  constructor(private datasource: DataSource) {
    super(PaymentLog, datasource.createEntityManager());
  }

  async getOrders(userId: number) {
    const getOrdersData = await this.createQueryBuilder()
      .where('userId = :userId', { userId })
      .getMany();
    return getOrdersData;
  }

  async postPaymentLog(userId: number, totalPrice: number, storeId: number) {
    const postPaymentLogData = await this.createQueryBuilder()
      .insert()
      // .into(PaymentLog)
      .values({ userId, status: '주문확인중', totalPrice, storeId })
      .execute();

    return postPaymentLogData;
  }

  async findPaymentLog(userId: number) {
    const findPaymentLogData = await this.createQueryBuilder()
      .where('userId = :userId', { userId })
      .getOne();

    return findPaymentLogData;
  }
}
