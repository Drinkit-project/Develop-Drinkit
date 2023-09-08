import { CommonEntity } from './common.entity';
import { Product } from './product.entity';
export declare class Discount extends CommonEntity {
    discountPrice: number;
    discountRating: number;
    startDate: Date;
    endDate: Date;
    productId: number;
    product: Product;
}
