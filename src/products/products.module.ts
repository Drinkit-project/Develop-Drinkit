import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Review } from 'src/entities/review.entity';
import { Store_Product } from 'src/entities/store_product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Review, Store_Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
