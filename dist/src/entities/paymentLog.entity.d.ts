import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { PaymentDetail } from './paymentDetail.entity';
export declare enum PaymentStatus {
    ORDER_PENDING = "\uC8FC\uBB38\uD655\uC778\uC911",
    READY = "\uC0C1\uD488\uC900\uBE44\uC911",
    READY_COMPLETE = "\uC0C1\uD488\uC900\uBE44\uC644\uB8CC",
    DELIVERY = "\uBC30\uC1A1\uC911",
    PICKUP = "\uD53D\uC5C5\uC911",
    COMPLETE = "\uC644\uB8CC",
    WAIT_CANCELL = "\uCDE8\uC18C\uB300\uAE30",
    CANCELLED = "\uCDE8\uC18C"
}
export declare class PaymentLog extends CommonEntity {
    userId: number;
    status: string;
    totalPrice: number;
    storeId: number;
    paidPoint: number;
    impUid: string;
    address: string;
    user: User;
    paymentDetail: PaymentDetail[];
}
