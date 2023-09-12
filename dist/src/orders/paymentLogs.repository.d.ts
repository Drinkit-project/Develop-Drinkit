import { PaymentLog } from 'src/entities/paymentLog.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
export declare class PaymentLogRepository extends Repository<PaymentLog> {
    private datasource;
    constructor(datasource: DataSource);
    getOrders(userId: number): Promise<PaymentLog[]>;
    getPaymentLog(paymentLogId: number): Promise<PaymentLog>;
    getStoreOrders(storeId: number): Promise<PaymentLog[]>;
    getAdminOrders(): Promise<PaymentLog[]>;
    updateOrdersStatus(paymentLogId: number, status: string): Promise<import("typeorm").UpdateResult>;
    postPaymentLog(userId: number, totalPrice: number, storeId: number, paidPoint: number, manager: EntityManager, impUid: string, address: string, status?: string): Promise<import("typeorm").InsertResult>;
    postPaymentLogBySubscribe(userId: number, totalPrice: number, storeId: number, paidPoint: number, manager: EntityManager, impUid: string, address: string, status?: string): Promise<void>;
    findPaymentLog(userId: number): Promise<PaymentLog>;
    deletePaymentLog(paymentLogId: number, manager: EntityManager): Promise<import("typeorm").DeleteResult>;
}
