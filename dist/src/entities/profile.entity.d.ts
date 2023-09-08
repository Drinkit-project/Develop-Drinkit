import { User } from './user.entity';
import { CommonEntity } from './common.entity';
declare const Profile_base: import("@nestjs/common").Type<Pick<CommonEntity, "createdAt" | "updatedAt">>;
export declare class Profile extends Profile_base {
    userId: number;
    address: string;
    phoneNumber: string;
    nickname: string;
    name: string;
    user: User;
}
export {};
