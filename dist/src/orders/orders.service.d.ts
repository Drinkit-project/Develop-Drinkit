import { PaymentLogRepository } from './paymentLogs.repository';
import { PaymentDetailRepository } from './paymentDetails.repository';
import { Store_ProductRepository } from 'src/stores/store_product.repository';
import { StoresRepository } from 'src/stores/stores.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { DataSource } from 'typeorm';
export declare class OrdersService {
    private dataSource;
    private paymentLogsRepository;
    private paymentDetailsRepository;
    private store_ProductsRepository;
    private storesRepository;
    private productsRepository;
    constructor(dataSource: DataSource, paymentLogsRepository: PaymentLogRepository, paymentDetailsRepository: PaymentDetailRepository, store_ProductsRepository: Store_ProductRepository, storesRepository: StoresRepository, productsRepository: ProductsRepository);
    getOrders(userId: number): Promise<import("src/entities/paymentLog.entity").PaymentLog[]>;
    getOrdersDetail(paymentLogId: number): Promise<any[]>;
    getStore(storeId: number): Promise<import("../entities/store.entity").Store>;
    getStoreOrders(userId: number, storeId: number): Promise<import("src/entities/paymentLog.entity").PaymentLog[]>;
    getAdminOrders(): Promise<import("src/entities/paymentLog.entity").PaymentLog[]>;
    updateOrdersStatusByStore(userId: number, paymentLogId: number): Promise<import("typeorm").UpdateResult>;
    updateOrdersStatusByAdmin(paymentLogId: number): Promise<import("typeorm").UpdateResult>;
    addPoint(userId: number, point: number, impUid: string): Promise<string>;
    refund(imp_uid: string): Promise<any>;
    checkOrderList(orderList: Array<{
        productId: number;
        count: number;
    }>, userId: number, paidPoint: number, storeId: number, point: number): Promise<true | "포인트 보유량이 사용 포인트보다 적습니다.">;
    postOrder(userId: number, paidPoint: number, totalPrice: number, orderList: Array<{
        productId: number;
        count: number;
    }>, storeId: number | null, impUid: string, address: string): Promise<string>;
    requestCancelOrder(userId: number, paymentLogId: number): Promise<import("typeorm").UpdateResult>;
    cancelOrderByCustomer(userId: number, paymentLogId: number, isAdmin: boolean): Promise<void>;
    cancelOrderByStore(userId: number, paymentLogId: number, storeId: number): Promise<void>;
    cancelOrderByAdmin(paymentLogId: number): Promise<void>;
}
