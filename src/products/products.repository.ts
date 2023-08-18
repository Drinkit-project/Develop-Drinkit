import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }

  async getById(id) {
    const product = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.id',
        'product.productName',
        'category.name',
        'product.discription',
        'product.imgUrl',
        'product.price',
      ])
      .where('product.id = :id', { id })
      .getOne();

    return product;
  }

  async updateProducts(productId, newProduct) {
    const { categoryId, productName, price, discription, imgUrl } = newProduct;

    const updatedProduct = await this.createQueryBuilder('product')
      .update()
      .set({
        productName,
        price,
        discription,
        categoryId,
        imgUrl,
      })
      .where('id = :productId', { productId })
      .execute();

    return updatedProduct;
  }

  async removeProducts(productId) {
    const updatedProduct = await this.createQueryBuilder('product')
      .delete()
      .where('id = :productId', { productId })
      .execute();

    return updatedProduct;
  }
}
