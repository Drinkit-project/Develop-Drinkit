import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Discount } from 'src/entities/discout.entity';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { PaymentLog } from 'src/entities/paymentLog.entity';
import { Profile } from 'src/entities/profile.entity';
import { Review } from 'src/entities/review.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { Store } from 'src/entities/store.entity';
import { Subscribe } from 'src/entities/subscribe.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [
        Product,
        Category,
        Discount,
        PaymentDetail,
        PaymentLog,
        Profile,
        Review,
        Store_Product,
        Store,
        Subscribe,
        User,
      ],
      logging: false,
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
      // extra: {
      //   ssl: { rejectUnauthorized: false },
      // },
    };
  }
}
