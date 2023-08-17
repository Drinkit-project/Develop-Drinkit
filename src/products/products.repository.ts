import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }
}
