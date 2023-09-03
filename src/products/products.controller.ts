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

  // // 더미데이터 생성
  // @Post('/seed')
  // async seed() {
  //   for (let i = 0; i < 50; i++) {
  //     const arrRandNum = Math.floor(Math.random() * 5);
  //     const randCategoryArr = [1, 2, 3, 4, 5];
  //     const randNameArr = ['전통주', '와인', '양주', '과실주', '증류주'];
  //     const randPriceArr = [30000, 20000, 78000, 15700, 46000];
  //     const randDesArr = [
  //       '우리나라 전통주',
  //       '저렴한 와인',
  //       '독한 양주',
  //       '향기좋은 과실주',
  //       '전통 증류주',
  //     ];
  //     const randImgArr = [
  //       'https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/thumbnail/lvRp-1673341341744-naju+%286%29.jpg',
  //       'https://c.pxhere.com/photos/62/a4/wine_bottle_red_wine_fruit_wine_red_cork_bottle_beverage-590183.jpg!s1',
  //       'https://c.pxhere.com/photos/1b/dc/alcohol_bottle_whisky_product_drink_beverage_alcoholic_drinks_design-684162.jpg!s1',
  //       'https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/thumbnail/xdPQ-1642143289464-gdr%20bsa0.jpg',
  //       'https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/thumbnail/70IT-1673334350094-21+%282%29.jpg',
  //     ];
  //     const randStock = Math.floor(Math.random() * 51);
  //     const data = {
  //       categoryId: randCategoryArr[arrRandNum],
  //       productName: `${i}번 ${randNameArr[arrRandNum]}`,
  //       price: randPriceArr[arrRandNum],
  //       description: `${i}번 ${randDesArr[arrRandNum]}`,
  //       imgUrl: randImgArr[arrRandNum],
  //       totalStock: randStock,
  //     };
  //     await this.productsService.createProducts(data);
  //   }
  //   return '작업완료';
  // }
}
