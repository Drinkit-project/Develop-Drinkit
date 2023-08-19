import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderReqDto } from './dto/orders.request.dto';
import { PostOrderReqDto } from './dto/postOrders.request.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: '유저 주문 내역 조회' })
  @Get()
  async getOrders() {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const getOrdersData = await this.ordersService.getOrders(userId);
    return getOrdersData;
  }

  @ApiOperation({ summary: '가게 주문 내역 조회' })
  @Get('?storeId=:storeId')
  async getStoreOrders(@Query('storeId') storeId: number) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const getStoreOrdersData = await this.ordersService.getStoreOrders(
      userId,
      storeId,
    );
    return getStoreOrdersData;
  }

  @ApiOperation({ summary: '주문 내역 상세 조회' })
  @Get(':paymentLogId')
  async getOrdersDetail(@Param('paymentLogId') paymentLogId: number) {
    const getOrdersDetailData = await this.ordersService.getOrdersDetail(
      paymentLogId,
    );
    return getOrdersDetailData;
  }

  @ApiOperation({ summary: '업주 주문 상태 변경' })
  @Put(':paymentLogId')
  async updateOrdersStatusByStore(@Param('paymentLogId') paymentLogId: number) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const updateOrdersStatusByStoreData =
      await this.ordersService.updateOrdersStatusByStore(userId, paymentLogId);
    return updateOrdersStatusByStoreData;
  }

  @ApiOperation({ summary: '어드민 주문 상태 변경' })
  @Put(':paymentLogId')
  async updateOrdersStatusByAdmin(@Param('paymentLogId') paymentLogId: number) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const updateOrdersStatusByAdminData =
      await this.ordersService.updateOrdersStatusByAdmin(userId, paymentLogId);
    return updateOrdersStatusByAdminData;
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
      dto.paidPoint,
      dto.totalPrice,
      dto.orderList,
      dto.storeId,
    );

    return postOrderData;
  }

  @ApiOperation({ summary: '고객 주문 취소 요청' })
  @Delete(':paymentLogId')
  async requestCancelOrder(@Param('paymentLogId') paymentLogId: number) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const requestCancelOrderData = await this.ordersService.requestCancelOrder(
      userId,
      paymentLogId,
    );

    return requestCancelOrderData;
  }

  @ApiOperation({ summary: '고객 주문 취소 완료' })
  @Delete(':paymentLogId/Ok')
  async cancelOrderByCustomer(@Param('paymentLogId') paymentLogId: number) {
    const userId = 1; //Todo: (인증 부분 확인 후 추가)
    const cancelOrderByCustomerData =
      await this.ordersService.cancelOrderByCustomer(userId, paymentLogId);

    return cancelOrderByCustomerData;
  }
}
