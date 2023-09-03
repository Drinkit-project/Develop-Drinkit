import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateProductsRequestDto } from './dto/products.request.dto';
import { AdminUser } from 'src/commons/decorators/user.decorators';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformBodyInterceptor } from 'src/commons/interceptors/product.request.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @Get()
  // // Todo: 로그인 추가
  // async getProducts() {
  //   const products = await this.productsService.getProducts();
  //   return products;
  // }

  @ApiOperation({ summary: '상품 카테고리 별 조회' })
  @Get()
  // Todo: 로그인 추가
  async getProductsByCategory(@Query('categoryId') categoryId) {
    if (categoryId === '0' || !categoryId) {
      const products = await this.productsService.getProducts();
      return products;
    } else {
      const products = await this.productsService.getProductsByCategory(
        categoryId,
      );
      return products;
    }
  }

  @ApiOperation({ summary: '상품 상세 조회' })
  @Get('/:productId')
  // Todo: 로그인 추가
  async getProductsById(@Param() param) {
    const { productId } = param;
    const products = await this.productsService.getProductsById(productId);
    return products;
  }

  @ApiOperation({ summary: '상품 등록' })
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformBodyInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createProducts(
    @AdminUser() user,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    const productJson = body;

    const newProduct = await this.productsService.createProducts(productJson);

    return `상품 등록 완료!`;
  }

  @ApiOperation({ summary: '상품 수정' })
  @UseGuards(AuthGuard)
  @Put('/:productId')
  async updateProducts(
    @AdminUser() user,
    @Param() param,
    @Body() body: UpdateProductsRequestDto,
  ) {
    const { productId } = param;

    const newProduct = await this.productsService.updateProducts(
      productId,
      body,
    );

    return '상품 수정 완료!';
  }

  @ApiOperation({ summary: '상품 삭제' })
  @UseGuards(AuthGuard)
  @Delete('/:productId')
  async removeProducts(@AdminUser() user, @Param() param) {
    const { productId } = param;

    const removedProduct = await this.productsService.removeProducts(productId);

    return '상품 삭제 완료!';
  }
}
