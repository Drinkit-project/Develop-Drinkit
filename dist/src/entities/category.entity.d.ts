import { CommonEntity } from './common.entity';
import { Product } from './product.entity';
export declare class Category extends CommonEntity {
    name: string;
    product: Product[];
}
