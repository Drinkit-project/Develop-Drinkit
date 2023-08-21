import { Injectable } from '@nestjs/common';
import { Subscribe } from 'src/entities/subscribe.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubscribesRepository extends Repository<Subscribe> {
  constructor(private datasource: DataSource) {
    super(Subscribe, datasource.createEntityManager());
  }

  async postSubscribe(userId: number, isPaid: boolean) {
    const postSubscribeData = await this.createQueryBuilder()
      .insert()
      .into(Subscribe)
      .values([{ userId, isPaid }])
      .execute();

    return postSubscribeData;
  }

  async getSubscribe(userId: number) {
    const getSubscribeData = await this.createQueryBuilder('subscribe')
      .where('subscribe.userId = :userId', { userId })
      .getOne();
    return getSubscribeData;
  }

  async updateSubscribe(userId: number, isPaid: boolean) {
    const updateSubscribeData = await this.createQueryBuilder()
      .update(Subscribe)
      .set({ isPaid })
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
