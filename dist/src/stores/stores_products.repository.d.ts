import { Store_Product } from 'src/entities/store_product.entity';
import { DataSource, Repository } from 'typeorm';
export declare class Store_ProductsRepository extends Repository<Store_Product> {
    private datasource;
    constructor(datasource: DataSource);
}
