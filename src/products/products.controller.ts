import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateProductsRequestDto,
  UpdateProductsRequestDto,
} from './dto/products.request.dto';

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

  @ApiOperation({ summary: '상품 수정' })
  @Put('/:productId')
  async updateProducts(@Param() param, @Body() body: UpdateProductsRequestDto) {
    const { productId } = param;

    const newProduct = await this.productsService.updateProducts(
      productId,
      body,
    );

    return '상품 수정 완료!';
  }

  @ApiOperation({ summary: '상품 수정' })
  @Delete('/:productId')
  async removeProducts(@Param() param) {
    const { productId } = param;

    const removedProduct = await this.productsService.removeProducts(productId);

    return '상품 삭제 완료!';
  }
}
