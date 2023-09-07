export declare class PostOrderReqDto {
    readonly totalPrice: number;
    readonly orderList: Array<{
        productId: number;
        count: number;
        productName: string;
        price: number;
    }>;
    readonly impUid: string;
    readonly address: string;
    readonly paidPoint: number;
    readonly storeId: number;
}
