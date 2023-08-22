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
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { CurrentUser } from 'src/commons/decorators/user.decorators';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get() // 장바구니 조회
  @ApiOperation({ summary: 'Get cart from Redis by UserID' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getCartByUserId(@CurrentUser() userId: string) {
    const result = this.cartService.getCart(userId);
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`${userId} doesn't exist on DB`);
    }
  }

  @Post('/product') // 장바구니 상품 추가
  @ApiOperation({ summary: 'Add product on cart' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  addItemOnCart(@Body() body: AddItemDTO, @CurrentUser() userId: string) {
    const result = this.cartService.addItemOnCart(userId, body);
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`${userId} doesn't exist on DB`);
    }
  }

  @Put() // 장바구니 내 상품 수량 조정
  updateItemOnCart(
    @Query('id', ParseIntPipe) id: number,
    @CurrentUser() userId: string,
    @Body() body: UpdateItemDTO,
  ) {
    // User 의 데이터는 JWTGuard를 통해 가져오는 로직이 생성되면 Query에서가 아닌 Req에서 가져오게될것.
    return this.cartService.updateItemOnCart(id, userId, body);
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
