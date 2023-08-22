import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Discount } from 'src/entities/discout.entity';
import { User } from 'src/entities/user.entity';
import { Review } from 'src/entities/review.entity';
import { ReviewsRepository } from './reviews.repository';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      PaymentLog,
      PaymentDetail,
      Discount,
      Review,
      User,
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsRepository],
})
export class ReviewsModule {}
