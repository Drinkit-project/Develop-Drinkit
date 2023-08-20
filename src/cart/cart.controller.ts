import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddItemDTO } from './DTO/cartAddItemDTO';
import { UpdateItemDTO } from './DTO/cartUpdateItemDTO';

@ApiTags('Cart')
@Controller('cart')
// @UseGuards(JWTGuard)
export class CartController {
  private users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // User 연결 전 하드코딩용
  constructor(private readonly cartService: CartService) {}

  @Get() // 장바구니 조회
  @ApiOperation({ summary: 'Get cart from Redis by UserID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getCartByUserId(@Query('id', ParseIntPipe) id: number) {
    const result = this.users.find((v) => {
      if (v == id) return true;
    });
    if (result) {
      return this.cartService.getCart(id);
    } else {
      throw new NotFoundException(`${id} doesn't exist on DB`);
    }
  }

  @Post('/product') // 장바구니 상품 추가
  @ApiOperation({ summary: 'Add product on cart' })
  addItemOnCart(
    @Body() body: AddItemDTO,
    @Query('id', ParseIntPipe) id: number,
  ) {
    const result = this.users.find((v) => {
      if (v == id) return true;
    });
    if (result) {
      return this.cartService.addItemOnCart(id, body);
    } else {
      throw new NotFoundException(`${id} doesn't exist on DB`);
    }
  }

  @Post() // Redis 내 장바구니 추가
  addCartOnRedis(@Query('id', ParseIntPipe) id: number) {
    return this.cartService.registCartOnRedis(id);
  }

  @Put() // 장바구니 내 상품 수량 조정
  updateItemOnCart(
    @Query('id', ParseIntPipe) id: number,
    @Query('productId', ParseIntPipe) productId: number,
    @Body() body: UpdateItemDTO,
  ) {
    // User 의 데이터는 JWTGuard를 통해 가져오는 로직이 생성되면 Query에서가 아닌 Req에서 가져오게될것.
    return this.cartService.updateItemOnCart(id, productId, body);
  }

  @Delete('/product') // 장바구니 내 아이템 삭제
  deleteItemOnCartByProductId(
    @Query('id', ParseIntPipe) id: number,
    @Query('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.deleteItemOnCart(id, productId);
  }

  @Delete() // Redis 내 장바구니 삭제
  deleteCartOnRedis(@Query('id', ParseIntPipe) id: number) {
    return this.cartService.deleteCartOnRedis(id);
  }
}
