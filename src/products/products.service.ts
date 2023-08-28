import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { OpenSearchService } from 'src/open-search/open-search.service';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private openSearchService: OpenSearchService,
  ) {}

  async getProducts() {
    const products = await this.productsRepository.getAll();
    return products;
  }

  async getProductsById(id) {
    const products = await this.productsRepository.getById(id);

    if (!products) {
      throw new NotFoundException('해당 상품을 조회할 수 없습니다.');
    }

    return products;
  }

  async createProducts(newProduct) {
    const { categoryId, productName, price, description, imgUrl, totalStock } =
      newProduct;
    try {
      const createdProduct = await this.productsRepository.insert({
        categoryId: parseInt(categoryId),
        productName,
        price,
        description,
        imgUrl,
        totalStock,
      });

      await this.openSearchService.uploadSearch(
        createdProduct.identifiers[0].id,
        productName,
      );

      return createdProduct;
    } catch (error) {
      throw new BadGatewayException(`서버에러 messege: ${error}`);
    }
  }

  async updateProducts(productId, newProduct) {
    const updatedProduct = await this.productsRepository.updateProducts(
      productId,
      newProduct,
    );

    await this.openSearchService.deleteSearch(productId);
    await this.openSearchService.uploadSearch(
      productId,
      newProduct.productName,
    );

    return updatedProduct;
  }

  async removeProducts(productId) {
    const removedProduct = await this.productsRepository.removeProducts(
      productId,
    );

    await this.openSearchService.deleteSearch(productId);

    return removedProduct;
  }
}
