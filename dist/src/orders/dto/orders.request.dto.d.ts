export declare class OrderReqDto {
    readonly orderList: Array<{
        productId: number;
        count: number;
        productName: string;
        price: number;
    }>;
    readonly paidPoint: number;
    readonly storeId: number;
}
