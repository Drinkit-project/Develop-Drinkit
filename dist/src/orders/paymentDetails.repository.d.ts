import { PaymentDetail } from 'src/entities/paymentDetail.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
export declare class PaymentDetailRepository extends Repository<PaymentDetail> {
    private datasource;
    constructor(datasource: DataSource);
    getOrdersDetail(paymentLogId: number): Promise<any[]>;
    getPaymentDetails(paymentLogId: number): Promise<PaymentDetail[]>;
    postPaymentDetail(paymentDetailArray: Array<{
        productId: number;
        paymentLogId: number;
        count: number;
    }>, manager: EntityManager): Promise<import("typeorm").InsertResult>;
    deletePaymentDetails(paymentLogId: number, manager: EntityManager): Promise<import("typeorm").DeleteResult>;
}
