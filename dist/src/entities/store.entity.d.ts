import { User } from 'src/entities/user.entity';
import { Store_Product } from 'src/entities/store_product.entity';
import { CommonEntity } from './common.entity';
export declare class Store extends CommonEntity {
    name: string;
    description: string;
    businessLicense: string;
    imgUrls: string;
    userId: number;
    address: string;
    lat: number;
    lng: number;
    user: User;
    productList: Store_Product[];
}
