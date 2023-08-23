import { Injectable } from '@nestjs/common';
import { Store_Product } from 'src/entities/store_product.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateProductDTO } from './DTO/update.DTO';

@Injectable()
export class Store_ProductRepository extends Repository<Store_Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Store_Product, dataSource.createEntityManager());
  }

  async getProductDetailByStoreIdAndProductId(
    storeId: number,
    productId: number,
  ) {
    const foundStoreProduct = await this.createQueryBuilder('store_product')
      .leftJoinAndSelect('store_product.product', 'product')
      .where('store_product.storeId = :storeId', { storeId })
      .andWhere('store_product.productId = :productId', { productId })
      .getOne();

    return foundStoreProduct;
  }

  addProductOnStore(obj: object) {
    const product = this.createQueryBuilder('store_product')
      .insert()
      .into(Store_Product)
      .values(obj)
      .execute();

    return product;
  }

  async updateProductStock(data: UpdateProductDTO) {
    return;
  }
}
