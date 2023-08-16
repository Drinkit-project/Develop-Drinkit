import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/products/products.entity';
import * as fs from 'fs';

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
      entities: [Product],
      logging: this.configService.get<boolean>('DATABASE_LOGGING'),
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
      ssl: {
        ca: fs.readFileSync('global-bundle.pem'),
      },
      extra: {
        ssl: { rejectUnauthorized: false },
      },
      //   autoLoadEntities: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'),
    };
  }
}
