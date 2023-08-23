import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentDetailRepository } from './paymentDetails.repository';
import { PaymentLogRepository } from './paymentLogs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Store } from 'src/entities/store.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { UsersRepository } from 'src/user/users.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { StoresRepository } from 'src/stores/stores.repository';
import { Store_ProductsRepository } from 'src/stores/stores_products.repository';
import { UsersModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentDetail,
      PaymentLog,
      User,
      Product,
      Store,
      Store_Product,
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PaymentDetailRepository,
    PaymentLogRepository,
    ProductsRepository,
    StoresRepository,
    Store_ProductsRepository,
  ],
})
export class OrdersModule {}
