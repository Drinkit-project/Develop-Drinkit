import { Injectable } from '@nestjs/common';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PaymentStatus } from 'src/entities/paymentLog.entity';

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

  async getPaymentLog(paymentLogId: number) {
    const getPaymentLogData = await this.createQueryBuilder()
      .where('id = :paymentLogId', { paymentLogId })
      .getOne();

    return getPaymentLogData;
  }

  async getStoreOrders(storeId: number) {
    const getStoreOrdersData = await this.createQueryBuilder()
      .where('storeId = :storeId', { storeId })
      .getMany();
    return getStoreOrdersData;
  }

  async updateOrdersStatus(paymentLogId: number, status: string) {
    const updateOrdersStatusData = await this.createQueryBuilder()
      .update(PaymentLog)
      .set({ status })
      .where('id = :paymentLogId', { paymentLogId })
      .execute();
    return updateOrdersStatusData;
  }

  async postPaymentLog(
    userId: number,
    totalPrice: number,
    storeId: number,
    paidPoint: number,
    manager: EntityManager,
  ) {
    const postPaymentLogData = await manager
      .createQueryBuilder()
      .insert()
      .into(PaymentLog)
      .values({
        userId,
        status: PaymentStatus.ORDER_PENDING,
        totalPrice,
        storeId,
        paidPoint,
      })
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
