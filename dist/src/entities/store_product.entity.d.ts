import { Store } from 'src/entities/store.entity';
import { Product } from 'src/entities/product.entity';
import { CommonEntity } from './common.entity';
export declare class Store_Product extends CommonEntity {
    storeId: number;
    productId: number;
    storeStock: number;
    store: Store;
    product: Product;
}
