import { Injectable } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { DataSource, Repository } from 'typeorm';
import StockDTO from './DTO/stock.DTO';
import { Store_Product } from 'src/entities/store_product.entity';

@Injectable()
export class StoresRepository extends Repository<Store> {
  constructor(private datasource: DataSource) {
    super(Store, datasource.createEntityManager());
  }
  findStoreById(id: number) {
    return this.createQueryBuilder('store')
      .leftJoinAndSelect('store.user', 'user')
      .leftJoinAndSelect('store.productList', 'store_product')
      .where('store.id = :id', { id })
      .getOne();
  }

  async findStoreByStock(body: Array<StockDTO>) {
    let query = '';
    for (let i = 1; i < body.length; i++) {
      query += `AND s."id" IN (
        SELECT sp."storeId" FROM "store_product" as sp
        WHERE (sp."productId" = ${body[i].productId} AND sp."storeStock" >= ${body[i].count})
      )`;
    }

    const store = this.query(
      `SELECT s."id", s."address", s."name", s."description", s."imgUrls", s."lat", s."lng" FROM "store" as s
    WHERE s."id"
    IN (SELECT sp."storeId" FROM "store_product" as sp
      WHERE (sp."productId" = ${body[0].productId} AND sp."storeStock" >= ${body[0].count})
    )` + query,
    );

    return store;
  }

  createStore(obj: object) {
    const store = this.createQueryBuilder('store')
      .insert()
      .into(Store)
      .values(obj)
      .execute();

    return store;
  }
}
