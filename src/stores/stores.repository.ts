import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StoresRepository extends Repository<Store> {
  constructor(private datasource: DataSource) {
    super(Store, datasource.createEntityManager());
  }
  findStoreById(id: number) {
    return this.createQueryBuilder('store')
      .leftJoinAndSelect('store.user', 'storeOwner')
      .leftJoinAndSelect('store.productList', 'store_product')
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

  addProductOnStore(obj: object) {
    const product = this.datasource
      .getRepository(Store_Product)
      .createQueryBuilder('store_product')
      .insert()
      .into(Store_Product)
      .values(obj)
      .execute();

    return product;
  }
}
