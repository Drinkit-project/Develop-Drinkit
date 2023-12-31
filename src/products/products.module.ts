import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Review } from 'src/entities/review.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { Discount } from 'src/entities/discout.entity';
import { DiscountsService } from './discounts/discounts.service';
import { DiscountsRepository } from './discounts/discounts.repository';
import { DiscountsController } from './discounts/discounts.controller';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';
import { CategoryController } from './category/category.controler';
import { CategoryService } from './category/category.service';
import { CategoryRepository } from './category/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Discount,
      Category,
      Review,
      User,
      Store_Product,
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProductsController, CategoryController, DiscountsController],
  providers: [
    ProductsService,
    ProductsRepository,
    DiscountsService,
    DiscountsRepository,
    CategoryService,
    CategoryRepository,
    OpenSearchService,
  ],
})
export class ProductsModule {}
