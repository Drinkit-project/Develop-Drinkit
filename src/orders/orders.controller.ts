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
import {
  CurrentUser,
  PersonalUser,
  AdminUser,
} from 'src/commons/decorators/user.decorators';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: '유저 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get()
  async getOrders(@CurrentUser() user) {
    const getOrdersData = await this.ordersService.getOrders(user.id);
    return getOrdersData;
  }

  @ApiOperation({ summary: '가게 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get(':storeId')
  async getStoreOrders(
    @PersonalUser() user,
    @Param('storeId') storeId: number,
  ) {
    console.log(user.id, storeId);
    const getStoreOrdersData = await this.ordersService.getStoreOrders(
      user.id,
      storeId,
    );
    return getStoreOrdersData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 내역 조회' })
  @UseGuards(AuthGuard)
  @Get('/Admin')
  async getAdminOrders(@AdminUser() user) {
    const getAdminOrdersData = await this.ordersService.getAdminOrders();
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
  @Put(':paymentLogId/Store/:storeId')
  async updateOrdersStatusByStore(
    @PersonalUser() user,
    @Param('paymentLogId') paymentLogId: number,
    @Param('storeId') storeId: number,
  ) {
    const updateOrdersStatusByStoreData =
      await this.ordersService.updateOrdersStatusByStore(user.id, paymentLogId);
    return updateOrdersStatusByStoreData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 상태 변경' })
  @UseGuards(AuthGuard)
  @Put(':paymentLogId/Admin')
  async updateOrdersStatusByAdmin(
    @AdminUser() user,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const updateOrdersStatusByAdminData =
      await this.ordersService.updateOrdersStatusByAdmin(paymentLogId);
    return updateOrdersStatusByAdminData;
  }

  @ApiOperation({ summary: '환불 - iamport' })
  @UseGuards(AuthGuard)
  @Post('/refund')
  async getPayInfo(@Body() imp_uid: string) {
    const getPayInfoData = await this.ordersService.refund(imp_uid['imp_uid']);

    return getPayInfoData;
  }

  @ApiOperation({ summary: '주문 요청 - iamport' })
  @UseGuards(AuthGuard)
  @Post()
  async order(@CurrentUser() user, @Body() dto: OrderReqDto) {
    const checkOrderListData = await this.ordersService.checkOrderList(
      dto.orderList,
      user.id,
      dto.paidPoint,
      dto.storeId,
      user.point,
    );

    return checkOrderListData;
  }

  @ApiOperation({ summary: '결제 성공 후 - iamport' })
  @UseGuards(AuthGuard)
  @Post('postOrder')
  async postOrder(@CurrentUser() user, @Body() dto: PostOrderReqDto) {
    const postOrderData = await this.ordersService.postOrder(
      user.id,
      dto.paidPoint,
      dto.totalPrice,
      dto.orderList,
      dto.storeId,
      dto.impUid,
      dto.address,
    );

    return postOrderData;
  }

  @ApiOperation({ summary: '고객 주문 취소 요청' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId')
  async requestCancelOrder(
    @CurrentUser() user,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const requestCancelOrderData = await this.ordersService.requestCancelOrder(
      user.id,
      paymentLogId,
    );

    return requestCancelOrderData;
  }

  @ApiOperation({ summary: '고객 주문 취소 완료' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/Ok')
  async cancelOrderByCustomer(
    @CurrentUser() user,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const cancelOrderByCustomerData =
      await this.ordersService.cancelOrderByCustomer(
        user.id,
        paymentLogId,
        user.isAdmin,
      );

    return cancelOrderByCustomerData;
  }

  @ApiOperation({ summary: '가게 주문 취소' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/store/:storeId')
  async cancelOrderByStore(
    @PersonalUser() user,
    @Param('paymentLogId') paymentLogId: number,
    @Param('storeId') storeId: number,
  ) {
    const cancelOrderByStoreData = await this.ordersService.cancelOrderByStore(
      user.id,
      paymentLogId,
      storeId,
    );

    return cancelOrderByStoreData;
  }

  @ApiOperation({ summary: '쇼핑몰 관리자 주문 취소' })
  @UseGuards(AuthGuard)
  @Delete(':paymentLogId/Admin')
  async cancelOrderByAdmin(
    @AdminUser() user,
    @Param('paymentLogId') paymentLogId: number,
  ) {
    const cancelOrderByAdminData = await this.ordersService.cancelOrderByAdmin(
      paymentLogId,
    );

    return cancelOrderByAdminData;
  }
}
