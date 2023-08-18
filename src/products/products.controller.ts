import { ProductsService } from './products.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProductsRequestDto } from './dto/products.request.dto';

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

  @Post()
  async createProducts(@Body() body: CreateProductsRequestDto) {
    const newProduct = await this.productsService.createProducts(body);

    if (!newProduct) {
    }
    return '상품 등록 완료!';
  }
}
