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
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.review', 'review')
      .leftJoinAndSelect('review.user', 'user')
      .select([
        'product.id',
        'product.productName',
        'category.name',
        'discount.discountPrice',
        'discount.discountRating',
        'discount.startDate',
        'discount.endDate',
        'product.description',
        'product.imgUrl',
        'product.price',
        'product.totalStock',
        'review.id',
        'review.content',
        'review.userId',
        'review.rating',
        'user.email',
      ])
      .where('product.id = :id', { id })
      .getOne();

    return product;
  }

  async getAll() {
    const product = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.discount', 'discount')
      .select([
        'product.id',
        'product.productName',
        'category.name',
        'discount.discountPrice',
        'discount.discountRating',
        'discount.startDate',
        'discount.endDate',
        'product.description',
        'product.imgUrl',
        'product.price',
        'product.totalStock',
      ])
      .getMany();

    return product;
  }

  async updateProducts(productId, newProduct) {
    const { categoryId, productName, price, description, imgUrl, totalStock } =
      newProduct;

    const updatedProduct = await this.createQueryBuilder('product')
      .update()
      .set({
        productName,
        price,
        description,
        categoryId,
        imgUrl,
        totalStock,
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
