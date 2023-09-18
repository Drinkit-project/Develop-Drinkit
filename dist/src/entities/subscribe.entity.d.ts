import { User } from 'src/entities/user.entity';
import { CommonEntity } from './common.entity';
declare const Subscribe_base: import("@nestjs/common").Type<Pick<CommonEntity, "createdAt" | "updatedAt">>;
export declare class Subscribe extends Subscribe_base {
    userId: number;
    isPaid: boolean;
    address: string;
    user: User;
}
export {};
