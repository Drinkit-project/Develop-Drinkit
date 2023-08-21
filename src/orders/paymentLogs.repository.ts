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
    const getOrdersData = await this.createQueryBuilder('paymentLog')
      .where('paymentLog.userId = :userId', { userId })
      .getMany();

    return getOrdersData;
  }

  async getPaymentLog(paymentLogId: number) {
    const getPaymentLogData = await this.createQueryBuilder('paymentLog')
      .where('paymentLog.id = :paymentLogId', { paymentLogId })
      .getOne();

    return getPaymentLogData;
  }

  async getStoreOrders(storeId: number) {
    const getStoreOrdersData = await this.createQueryBuilder('paymentLog')
      .where('paymentLog.storeId = :storeId', { storeId })
      .getMany();
    return getStoreOrdersData;
  }

  async getAdminOrders() {
    const getAdminOrdersData = await this.createQueryBuilder('paymentLog')
      .where('paymentLog.storeId = :storeId', { storeId: 1 })
      .getMany();
    return getAdminOrdersData;
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
    const findPaymentLogData = await this.createQueryBuilder('paymentLog')
      .where('paymentLog.userId = :userId', { userId })
      .orderBy('paymentLog.createdAt', 'DESC')
      .getOne();

    return findPaymentLogData;
  }

  async deletePaymentLog(paymentLogId: number, manager: EntityManager) {
    const deletePaymentLogData = await manager
      .createQueryBuilder()
      .delete()
      .from(PaymentLog)
      .where('id = :paymentLogId', { paymentLogId })
      .execute();

    return deletePaymentLogData;
  }
}