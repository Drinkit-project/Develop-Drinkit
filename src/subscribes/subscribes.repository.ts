import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { Subscribe } from 'src/entities/subscribe.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubscribesRepository extends Repository<Subscribe> {
  constructor(private datasource: DataSource) {
    super(Subscribe, datasource.createEntityManager());
  }

  async postSubscribe(userId: number, isPaid: boolean, address: string) {
    const postSubscribeData = await this.createQueryBuilder()
      .insert()
      .into(Subscribe)
      .values([{ userId, isPaid, address }])
      .execute();

    return postSubscribeData;
  }

  async getSubscribe(userId: number) {
    const getSubscribeData = await this.createQueryBuilder('subscribe')
      .where('subscribe.userId = :userId', { userId })
      .getOne();
    return getSubscribeData;
  }

  async getAllSubscribe() {
    const getAllSubscribeData = await this.createQueryBuilder('subscribe')
      .leftJoinAndSelect(User, 'user', 'user.id = subscribe.userId')
      .select([
        'subscribe.userId',
        'subscribe.isPaid',
        'subscribe.address',
        'user.email',
      ])
      .getRawMany();
    return getAllSubscribeData;
  }

  async getSelectSubscribe() {
    const getSelectSubscribeData = await this.createQueryBuilder('subscribe')
      .leftJoinAndSelect(User, 'user', 'user.id = subscribe.userId')
      .select(['subscribe.userId', 'subscribe.isPaid', 'subscribe.address'])
      .where('subscribe.isPaid = true')
      .andWhere('user.point >= 29900')
      .getRawMany();
    return getSelectSubscribeData;
  }

  async getSendMailSubscribe() {
    const getSendMailSubscribeData = await this.createQueryBuilder('subscribe')
      .leftJoinAndSelect(User, 'user', 'user.id = subscribe.userId')
      .select([
        'subscribe.userId',
        'subscribe.isPaid',
        'subscribe.address',
        'user.email',
      ])
      .where('subscribe.isPaid = true')
      .andWhere('user.point < 29900')
      .getRawMany();
    return getSendMailSubscribeData;
  }

  async updateSubscribe(userId: number, isPaid: boolean, address: string) {
    const updateSubscribeData = await this.createQueryBuilder()
      .update(Subscribe)
      .set({ isPaid, address })
      .where('userId = :userId', { userId })
      .execute();
    return updateSubscribeData;
  }

  async deleteSubscribe(userId: number) {
    const deleteSubscribe = await this.createQueryBuilder()
      .delete()
      .from(Subscribe)
      .where('userId = :userId', { userId })
      .execute();
    return deleteSubscribe;
  }
}
