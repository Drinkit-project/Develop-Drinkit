import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import {
  AdminUser,
  PersonalUser,
} from 'src/commons/decorators/user.decorators';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { User } from 'src/entities/user.entity';
import { AddProductDTO, CreateStoreDTO } from './DTO/create.DTO';
import { UpdateProductDTO, UpdateStoreDTO } from './DTO/update.DTO';
import { StockDTO } from './DTO/stock.DTO';

@ApiTags('Store')
@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  // 재고 있는 가게 조회
  @ApiOperation({
    summary: 'Get Store by stock',
  })
  @Get()
  async getStores(@Query('data') data: Array<StockDTO>) {
    try {
      const result = await this.storeService.getStores(data);
      return result;
    } catch (error) {
      throw new NotFoundException('There is no Store in DB');
    }
  }

  // 가게 상세 조회
  @ApiOperation({
    summary: 'Get Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @Get('/:storeId')
  async getStoreDetail(@Param('storeId', ParseIntPipe) id: number) {
    try {
      const result = await this.storeService.getStoreDetail(id);
      return result;
    } catch (e) {
      throw new NotFoundException('There is no Store in DB');
    }
  }

  // 가게 정보 등록 by AdminUser
  @ApiOperation({
    summary: 'Create Store',
  })
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async createStore(@AdminUser() user: User, @Body() body: CreateStoreDTO) {
    try {
      const result = await this.storeService.createStore(body);
      return result;
    } catch (e) {
      throw new BadRequestException('error => ' + e.message);
    }
  }

  // 가게 정보 수정
  @ApiOperation({
    summary: 'Update Store detail by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Patch('/:storeId')
  updateStroe(
    @Param('storeId', ParseIntPipe) id: number,
    @PersonalUser() user: User,
    @Body() body: UpdateStoreDTO,
  ) {
    try {
      const result = this.storeService.updateStore(id, user, body);
      if (result) {
        return { message: '성공적으로 업데이트되었습니다.' };
      } else {
        throw new BadRequestException('업데이트에 실패했습니다.');
      }
    } catch (e) {
      throw new BadRequestException('Please try again..');
    }
  }

  // 가게 정보 삭제
  @ApiOperation({
    summary: 'Delete Store by storeId',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Delete('/:storeId')
  async deleteStore(
    @Param('storeId', ParseIntPipe) id: number,
    @PersonalUser() user: User,
  ) {
    try {
      const result = await this.storeService.deleteStore(id, user);
      if (result) {
        return { message: '성공적으로 삭제되었습니다.' };
      } else {
        throw new BadRequestException('삭제에 실패했습니다.');
      }
    } catch (e) {
      throw new BadRequestException('Please try again..');
    }
  }

  /**
    Store_Product API
   */

  //가게 상품 상세정보 조회
  @ApiOperation({
    summary: 'Get Product detail in store product list',
    parameters: [
      { name: 'storeId', in: 'path' },
      { name: 'productId', in: 'path' },
    ],
  })
  @Get('/:storeId/:productId')
  async getProductDetailInProductList(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    try {
      const result =
        await this.storeService.getProductDetailByStoreIdAndProductId(
          storeId,
          productId,
        );
      return result;
    } catch (e) {
      throw new NotFoundException('There is no Product in List');
    }
  }

  // 가게 상품 추가
  @ApiOperation({
    summary: 'Add product on Store',
  })
  @ApiResponse({
    status: 201,
    description: 'created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post('/products')
  async addProductOnStore(
    @PersonalUser() user: User,
    @Body() body: AddProductDTO,
  ) {
    try {
      const result = await this.storeService.addProductOnStore(user, body);
      return result;
    } catch (e) {
      throw new BadRequestException('error => ' + e.message);
    }
  }

  //가게 상품 수정
  @ApiOperation({
    summary: 'Update product stock',
    parameters: [{ name: 'storeId', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Patch('/products/:productId')
  async updateProductStock(
    @Body() body: UpdateProductDTO,
    @Param('productId', ParseIntPipe) id: number,
  ) {
    try {
      const result = await this.storeService.updateProductStock(body, id);
      if (result === 1) {
        return { message: '재고 변경 완료' };
      } else if (result === 0) {
        return { message: '재고 변경 실패' };
      }
    } catch (e) {
      throw new BadRequestException('update to fail..');
    }
  }

  //가게 상품 삭제
  @ApiOperation({
    summary: 'Delete Store by storeId and productId',
    parameters: [
      { name: 'storeId', in: 'path' },
      { name: 'productId', in: 'path' },
    ],
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @UseGuards(AuthGuard)
  @Delete('/:storeId/:productId')
  async deleteProductInList(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    try {
      const result = await this.storeService.deleteProductInList(
        storeId,
        productId,
      );

      if (result === 1) {
        return { message: '상품 삭제 완료' };
      } else if (result === 0) {
        return { message: '상품 삭제 실패' };
      }
    } catch (e) {
      throw new BadRequestException('delete to fail..');
    }
  }

  // // store 더미데이터 생성
  // @Post('/seed')
  // async seedStores() {
  //   for (let i = 0; i < 100; i++) {
  //     const randImg = [
  //       'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_7D596477896F088ACFEC09E8F3CAC1C8.png&type=a340',
  //       'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_BFF7D8F799122E2F13F9EC63CA4C2ACC.jpg&type=a340',
  //       'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_5BB99A4B14C6640EAA3351E27D29E6E4.png&type=a340',
  //       'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_EABAEE47E7178357C7C840AC75C2BC42.png&type=a340',
  //       'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_9BB3AFEA6C388FA8BDDB626DD69D6D0A.png&type=a340',
  //     ][Math.floor(Math.random() * 5)];
  //     const randString = String(Math.floor(Math.random() * 123456));
  //     const randLat = 36.8151 + Math.floor(Math.random() * 400) / 10000;
  //     const randLng = 127.1139 + Math.floor(Math.random() * 400) / 10000;
  //     const data = {
  //       address: `천안시 불당동 ${i + 2}번 도로`,
  //       name: `천안시 ${i + 2}번 가게`,
  //       description: `${i + 2}번 가게 설명`,
  //       businessLicense: randString,
  //       imgUrls: randImg,
  //       userId: i + 2,
  //       lat: randLat,
  //       lng: randLng,
  //     };
  //     await this.storeService.createStore(data);
  //   }
  //   return '작업완료';
  // }

  // // stroe_product 더미데이터 생성
  // @Post('/seedproducts')
  // async seedStoreProducts() {
  //   for (let i = 1; i < 101; i++) {
  //     for (let j = 1; j < 51; j++) {
  //       const randStock = Math.floor(Math.random() * 21);
  //       const data = {
  //         productId: j,
  //         storeId: i,
  //         storeStock: randStock,
  //       };
  //       await this.storeService.seedProductOnStore(data);
  //     }
  //   }
  //   return '작업완료';
  // }
}
