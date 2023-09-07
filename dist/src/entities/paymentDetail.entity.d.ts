import { CommonEntity } from './common.entity';
import { Product } from './product.entity';
import { PaymentLog } from './paymentLog.entity';
import { Review } from './review.entity';
export declare class PaymentDetail extends CommonEntity {
    productId: number;
    paymentLogId: number;
    count: number;
    product: Product;
    paymentLog: PaymentLog;
    review: Review;
}
