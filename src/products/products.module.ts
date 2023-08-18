import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Review } from 'src/entities/review.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { DiscountsController } from './discounts/discounts.controller';
import { DiscountsService } from './discounts/discounts.service';
import { Discount } from 'src/entities/discout.entity';
import { DiscountsRepository } from './discounts/discounts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Discount,
      Category,
      Review,
      Store_Product,
    ]),
  ],
  controllers: [ProductsController, DiscountsController],
  providers: [
    ProductsService,
    ProductsRepository,
    DiscountsService,
    DiscountsRepository,
  ],
})
export class ProductsModule {}
