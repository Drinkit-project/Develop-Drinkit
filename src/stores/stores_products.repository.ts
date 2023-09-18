import { Injectable } from '@nestjs/common';
import { Store_Product } from 'src/entities/store_product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class Store_ProductsRepository extends Repository<Store_Product> {
  constructor(private datasource: DataSource) {
    super(Store_Product, datasource.createEntityManager());
  }
}
