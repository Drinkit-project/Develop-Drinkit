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

  async deleteSubscribe(subscribeId: number) {
    const deleteSubscribe = await this.createQueryBuilder()
      .delete()
      .where('subscribeId = :subscribeId', { subscribeId })
      .execute();
    return deleteSubscribe;
  }
}
