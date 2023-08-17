import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentDetailRepository } from './paymentDetail.repository';
import { PaymentLogRepository } from './paymentLog.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { PaymentLog } from 'src/entities/paymentLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetail, PaymentLog])],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentDetailRepository, PaymentLogRepository],
})
export class OrdersModule {}
