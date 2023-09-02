import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/products.repository';
import { PaymentLogRepository } from 'src/orders/paymentLogs.repository';
import { PaymentDetailRepository } from 'src/orders/paymentDetails.repository';
import { SubscribesRepository } from 'src/subscribes/subscribes.repository';
import { OrdersService } from 'src/orders/orders.service';
import { Store_ProductRepository } from 'src/stores/store_product.repository';
import { StoresRepository } from 'src/stores/stores.repository';
import { UsersRepository } from 'src/user/users.repository';
import { RedisService } from 'src/redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PaymentLog } from 'src/entities/paymentLog.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([User, PaymentLog]),
  ],
  providers: [
    CronService,
    OpenSearchService,
    ProductsService,
    OrdersService,
    ProductsRepository,
    PaymentLogRepository,
    SubscribesRepository,
    PaymentDetailRepository,
    Store_ProductRepository,
    StoresRepository,
    RedisService,
    UsersRepository,
  ],
})
export class CronModule {}
