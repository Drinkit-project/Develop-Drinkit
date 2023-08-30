import { PickType } from '@nestjs/swagger';
import { Store } from 'src/entities/store.entity';
import { Store_Product } from 'src/entities/store_product.entity';

export class CreateStoreDTO extends PickType(Store, [
  'address',
  'name',
  'description',
  'businessLicense',
  'imgUrls',
  'userId',
  'lat',
  'lng',
]) {}

export class AddProductDTO extends PickType(Store_Product, [
  'productId',
  'storeId',
  'storeStock',
]) {}
