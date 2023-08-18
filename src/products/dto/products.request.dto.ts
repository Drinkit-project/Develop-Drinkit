import { PickType } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';

export class CreateProductsRequestDto extends PickType(Product, [
  'price',
  'productName',
  'discription',
  'categoryId',
  'imgUrl',
]) {}
