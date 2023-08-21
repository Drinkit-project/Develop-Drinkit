import { ApiOperation } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateDiscountRequestDto } from './dto/discounts.request.dto';
import { AuthAdminGuard } from 'src/auth/security/jwt.admin.guard';

@Controller('products/:productId/discount')
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @ApiOperation({ summary: '상품 할인 적용' })
  @UseGuards(AuthAdminGuard)
  @Post()
  async createDiscount(@Param() param, @Body() body: CreateDiscountRequestDto) {
    const { productId } = param;

    if (!body['startDate'] && !body['endDate']) {
      throw new BadRequestException('시작과 마지막 날을 확인해주세요');
    }

    const createdDiscount = await this.discountsService.createDiscount(
      productId,
      body,
    );

    return { message: `할인 적용완료!` };
  }
}
