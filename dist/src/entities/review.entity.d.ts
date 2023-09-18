import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Product } from './product.entity';
import { PaymentDetail } from './paymentDetail.entity';
export declare class Review extends CommonEntity {
    productId: number;
    content: string;
    rating: number;
    userId: number;
    paymentDetailId: number;
    product: Product;
    user: User;
    paymentDetail: PaymentDetail;
}
