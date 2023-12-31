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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'config/typeorm.config.service';
import { UsersModule } from './user/users.module';
import { SubscribesModule } from './subscribes/subscribes.module';
import { RedisModule } from './redis/redis.module';
import { OpenSearchModule } from './open-search/open-search.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        // host: configService.get('REDIS_HOST'),
        // port: configService.get('REDIS_PORT'),
        url: configService.get('REDIS_URL'),
        ttl: 0, // expire - 만료 없는 상태 유지
      }),
    }),
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
    UsersModule,
    SubscribesModule,
    RedisModule,
    OpenSearchModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
