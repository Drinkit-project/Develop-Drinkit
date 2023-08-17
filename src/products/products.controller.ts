import { ProductsService } from './products.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: '상품 등록' })
  @Get()
  // Todo: 로그인 추가
  async getProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }
}
