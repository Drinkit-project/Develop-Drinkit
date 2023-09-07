import { CommonEntity } from './common.entity';
import { PaymentLog } from './paymentLog.entity';
import { Review } from './review.entity';
import { Store } from './store.entity';
import { Subscribe } from './subscribe.entity';
import { Profile } from './profile.entity';
export declare class User extends CommonEntity {
    isAdmin: boolean;
    email: string;
    isPersonal: boolean;
    point: number;
    password: string;
    paymentLog: PaymentLog[];
    store: Store;
    subscribe: Subscribe;
    profile: Profile;
    review: Review[];
}
