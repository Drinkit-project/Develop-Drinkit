import { Store_Product } from 'src/entities/store_product.entity';
import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { CommonEntity } from './common.entity';
import { Category } from './category.entity';
import { Review } from './review.entity';
import { Discount } from './discout.entity';
export declare class Product extends CommonEntity {
    price: number;
    productName: string;
    categoryId: number;
    totalStock: number;
    description: string;
    imgUrl: string;
    store_product: Store_Product[];
    paymentDetail: PaymentDetail[];
    discount: Discount;
    category: Category;
    review: Review[];
}
