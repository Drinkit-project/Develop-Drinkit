import { OrdersService } from './orders.service';
import { OrderReqDto } from './dto/orders.request.dto';
import { PostOrderReqDto } from './dto/postOrders.request.dto';
import { addPointDto } from './dto/addPoint.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getOrders(user: any): Promise<import("../entities/paymentLog.entity").PaymentLog[]>;
    getStoreOrders(user: any, storeId: number): Promise<import("../entities/paymentLog.entity").PaymentLog[]>;
    getAdminOrders(user: any): Promise<import("../entities/paymentLog.entity").PaymentLog[]>;
    getOrdersDetail(paymentLogId: number): Promise<any[]>;
    updateOrdersStatusByStore(user: any, paymentLogId: number, storeId: number): Promise<import("typeorm").UpdateResult>;
    updateOrdersStatusByAdmin(user: any, paymentLogId: number): Promise<import("typeorm").UpdateResult>;
    addPoint(user: any, dto: addPointDto): Promise<string>;
    getPayInfo(imp_uid: string): Promise<any>;
    order(user: any, dto: OrderReqDto): Promise<true | "포인트 보유량이 사용 포인트보다 적습니다.">;
    postOrder(user: any, dto: PostOrderReqDto): Promise<string>;
    requestCancelOrder(user: any, paymentLogId: number): Promise<import("typeorm").UpdateResult>;
    cancelOrderByCustomer(user: any, paymentLogId: number): Promise<void>;
    cancelOrderByStore(user: any, paymentLogId: number, storeId: number): Promise<void>;
    cancelOrderByAdmin(user: any, paymentLogId: number): Promise<void>;
}
