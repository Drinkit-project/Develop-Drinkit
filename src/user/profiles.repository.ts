import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfilesRepository extends Repository<Profile> {
  constructor(private datasource: DataSource) {
    super(Profile, datasource.createEntityManager());
  }

  async getProfile(userId: number) {
    const profile = await this.createQueryBuilder('profile')
      .where(`profile.userId = ${userId}`)
      .getMany();

    return profile;
  }

  async getAddress(userId: number) {
    const address = await this.createQueryBuilder('profile')
      .select('address')
      .where('profile.userId = :userId', { userId })
      .getMany();

    return address;
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
}
