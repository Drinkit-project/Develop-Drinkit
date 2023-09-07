import { Store } from 'src/entities/store.entity';
import { Store_Product } from 'src/entities/store_product.entity';
declare const UpdateStoreDTO_base: import("@nestjs/common").Type<Omit<Store, "id" | "businessLicense">>;
export declare class UpdateStoreDTO extends UpdateStoreDTO_base {
    address: string;
    name: string;
    description: string;
    userId: number;
}
declare const UpdateProductDTO_base: import("@nestjs/common").Type<Omit<Store_Product, "id" | "productId" | "storeStock">>;
export declare class UpdateProductDTO extends UpdateProductDTO_base {
    updateStock: number;
    upDown: boolean;
}
export {};
