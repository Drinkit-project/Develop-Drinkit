import { OmitType, PickType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class CreateProductsRequestDto extends PickType(Product, [
  'price',
  'productName',
  'description',
  'categoryId',
  'imgUrl',
  'totalStock',
]) {}

export class UpdateProductsRequestDto extends OmitType(Product, [
  'price',
  'productName',
  'description',
  'categoryId',
  'imgUrl',
  'totalStock',
]) {}
