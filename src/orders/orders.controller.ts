import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderReqDto } from './dto/orders.request.dto';
import { PostOrderReqDto } from './dto/postOrders.request.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: '주문 내역 조회' })
  @Get()
  async getOrders() {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const getOrdersData = await this.ordersService.getOrders(userId);
    return getOrdersData;
  }

  @ApiOperation({ summary: '주문 내역 상세 조회' })
  @Get(':paymentLogId')
  async getOrdersDetail(@Param('paymentLogId') paymentLogId: number) {
    const getOrdersDetailData = await this.ordersService.getOrdersDetail(
      paymentLogId,
    );
    return getOrdersDetailData;
  }

  @ApiOperation({ summary: '주문 요청 - i`mport' })
  @Post()
  async order(@Body() dto: OrderReqDto) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const checkOrderListData = await this.ordersService.checkOrderList(
      dto.orderList,
      userId,
      dto.usePoint,
      dto.storeId,
    );

    return checkOrderListData;
  }

  @ApiOperation({ summary: '결제 성공 후' })
  @Post('postOrder')
  async postOrder(@Body() dto: PostOrderReqDto) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const postOrderData = await this.ordersService.postOrder(
      userId,
      dto.point,
      dto.totalPrice,
      dto.orderList,
      dto.storeId,
    );

    return postOrderData;
  }
}
