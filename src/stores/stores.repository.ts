import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StoresRepository extends Repository<Store> {
  constructor(private datasource: DataSource) {
    super(Store, datasource.createEntityManager());
  }
  findStoreById(id: number) {
    return this.createQueryBuilder('store')
      .leftJoinAndSelect('store.user', 'user')
      .where('store.id = :id', { id })
      .getOne();
  }

  createStore(obj: object) {
    const store = this.createQueryBuilder('store')
      .insert()
      .into(Store)
      .values(obj)
      .execute();

    return store;
  }

  updateStoreById(id: number, obj: object) {
    return;
  }
}
