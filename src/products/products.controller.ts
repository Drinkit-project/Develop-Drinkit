import { ProductsService } from './products.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateProductsRequestDto } from './dto/products.request.dto';
import { IsNumber } from 'class-validator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  // Todo: 로그인 추가
  async getProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get('/:productId')
  // Todo: 로그인 추가
  async getProductsById(@Param() param) {
    const { productId } = param;
    const products = await this.productsService.getProductsById(productId);
    return products;
  }

  @ApiOperation({ summary: '상품 등록' })
  @Post()
  async createProducts(@Body() body: CreateProductsRequestDto) {
    const newProduct = await this.productsService.createProducts(body);

    if (!newProduct) {
    }
    return '상품 등록 완료!';
  }
}
