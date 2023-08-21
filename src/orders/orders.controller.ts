import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrderReqDto } from './dto/orders.request.dto';
import { PostOrderReqDto } from './dto/postOrders.request.dto';
import { AuthGuard } from 'src/auth/security/jwt.guard';
import { CurrentUser } from 'src/commons/decorators/user.decorators';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: '유저 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get()
  async getOrders(@CurrentUser() userId: number) {
    const getOrdersData = await this.ordersService.getOrders(userId);
    return getOrdersData;
  }

  @ApiOperation({ summary: '가게 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get('storeId')
  async getStoreOrders(
    @CurrentUser() userId: number,
    @Query('storeId') storeId: number,
  ) {
    const getStoreOrdersData = await this.ordersService.getStoreOrders(
      userId,
      storeId,
    );
    return getStoreOrdersData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get('/Admin')
  async getAdminOrders(@CurrentUser() userId: number) {
    const getAdminOrdersData = await this.ordersService.getAdminOrders(userId);
    return getAdminOrdersData;
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
  @UseGuards(AuthGuard)
  @Put(':paymentLogId/byStore')
  async updateOrdersStatusByStore(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const updateOrdersStatusByStoreData =
      await this.ordersService.updateOrdersStatusByStore(userId, paymentLogId);
    return updateOrdersStatusByStoreData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 상태 변경' })
  @UseGuards(AuthGuard)
  @Put(':paymentLogId/byAdmin')
  async updateOrdersStatusByAdmin(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const updateOrdersStatusByAdminData =
      await this.ordersService.updateOrdersStatusByAdmin(userId, paymentLogId);
    return updateOrdersStatusByAdminData;
  }

  @ApiOperation({ summary: '주문 요청 - i`mport' })
  @UseGuards(AuthGuard)
  @Post()
  async order(@CurrentUser() userId: number, @Body() dto: OrderReqDto) {
    const checkOrderListData = await this.ordersService.checkOrderList(
      dto.orderList,
      userId,
      dto.usePoint,
      dto.storeId,
    );

    return checkOrderListData;
  }

  @ApiOperation({ summary: '결제 성공 후' })
  @UseGuards(AuthGuard)
  @Post('postOrder')
  async postOrder(@CurrentUser() userId: number, @Body() dto: PostOrderReqDto) {
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
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId')
  async requestCancelOrder(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const requestCancelOrderData = await this.ordersService.requestCancelOrder(
      userId,
      paymentLogId,
    );

    return requestCancelOrderData;
  }

  @ApiOperation({ summary: '고객 주문 취소 완료' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/Ok')
  async cancelOrderByCustomer(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const cancelOrderByCustomerData =
      await this.ordersService.cancelOrderByCustomer(userId, paymentLogId);

    return cancelOrderByCustomerData;
  }

  @ApiOperation({ summary: '가게 주문 취소' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/store/:storeId')
  async cancelOrderByStore(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
    @Param('storeId') storeId: number,
  ) {
    const cancelOrderByStoreData = await this.ordersService.cancelOrderByStore(
      userId,
      paymentLogId,
      storeId,
    );

    return cancelOrderByStoreData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 취소' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/Admin')
  async cancelOrderByAdmin(
    @CurrentUser() userId: number,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const cancelOrderByAdminData = await this.ordersService.cancelOrderByAdmin(
      userId,
      paymentLogId,
    );

    return cancelOrderByAdminData;
  }
}
