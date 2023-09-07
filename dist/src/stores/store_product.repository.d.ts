import { Store_Product } from 'src/entities/store_product.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateProductDTO } from './DTO/update.DTO';
export declare class Store_ProductRepository extends Repository<Store_Product> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getProductDetailByStoreIdAndProductId(storeId: number, productId: number): Promise<Store_Product>;
    addProductOnStore(obj: object): Promise<import("typeorm").InsertResult>;
    updateProductStock(data: UpdateProductDTO): Promise<void>;
}
