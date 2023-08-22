import { Product } from 'src/entities/product.entity';

export class AddItemDTO {
  product: Pick<Product, 'id' | 'productName'>;
  quantity: number;
  finalPrice: number;
}

/**
 * 할인처리
 *
 * 할인 마감 시간에 아직 결제가 이루어지지 않았다면 할인 취소 로직을 어떻게 할것인가?
 */
