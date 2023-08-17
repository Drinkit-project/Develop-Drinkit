import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: '주문 내역 조회' })
  @Get()
  async getOrders() {
    const getOrdersData = await this.ordersService.getOrders();
    return getOrdersData;
  }

  @ApiOperation({ summary: '주문 내역 상세 조회' })
  @Get()
  async getOrdersDetail(@Param('paymentLogId') paymentLogId: number) {
    const getOrdersDetailData = await this.ordersService.getOrdersDetail(
      paymentLogId,
    );
    return getOrdersDetailData;
  }
}
