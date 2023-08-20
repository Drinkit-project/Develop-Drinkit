import { Product } from 'src/entities/product.entity';

export class AddItemDTO {
  product: Pick<Product, 'id' | 'productName'>;
  quantity: number;
  finalPrice: number;
}
