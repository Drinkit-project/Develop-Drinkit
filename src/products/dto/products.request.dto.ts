import { OmitType, PickType } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class CreateProductsRequestDto extends PickType(Product, [
  'price',
  'productName',
  'discription',
  'categoryId',
  'imgUrl',
]) {}

export class UpdateProductsRequestDto extends OmitType(Product, [
  'price',
  'productName',
  'discription',
  'categoryId',
  'imgUrl',
]) {}
