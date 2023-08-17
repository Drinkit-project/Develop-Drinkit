import { Injectable } from '@nestjs/common';
import { PaymentLogRepository } from './paymentLog.repository';
import { PaymentDetailRepository } from './paymentDetail.repository';

@Injectable()
export class OrdersService {
  constructor(
    private paymentLogRepository: PaymentLogRepository,
    private paymentDetailRepository: PaymentDetailRepository,
  ) {}

  async getOrders() {
    const getOrdersData = await this.paymentLogRepository.find();
    return getOrdersData;
  }

  async getOrdersDetail(paymentLogId: number) {
    const getOrdersDetailData = await this.paymentDetailRepository.findOne({
      relations: ['product'],
      where: { paymentLogId },
    });
    return getOrdersDetailData;
  }
}
