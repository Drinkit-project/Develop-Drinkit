import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StoresModule } from './stores/stores.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'config/typeorm.config.service';
import { SubscribesModule } from './subscribes/subscribes.module';

@Module({
  imports: [
    // CacheModule.registerAsync<RedisClientOptions>({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     store: redisStore,
    //     url: configService.get('REDIS_URL'),
    //     ttl: 0, // expire - 만료 없는 상태 유지
    //   }),
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    ReviewsModule,
    StoresModule,
    OrdersModule,
<<<<<<< HEAD
    CartModule,
    SubscribesModule,
=======
    // CartModule,
>>>>>>> 40d45ebe7486c999d8451346662d5a85acceebd0
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
