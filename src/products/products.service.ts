import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts() {
    const products = await this.productsRepository.find();
    return products;
  }

  async createProducts(newProduct) {
    const { categoryId, productName, price, discription, imgUrl } = newProduct;
    try {
      const createdProduct = await this.productsRepository.insert({
        categoryId: parseInt(categoryId),
        productName,
        price,
        discription,
        imgUrl,
      });

      return createdProduct;
    } catch (error) {
      throw new BadGatewayException(`서버에러 messege: ${error}`);
    }
  }
}
