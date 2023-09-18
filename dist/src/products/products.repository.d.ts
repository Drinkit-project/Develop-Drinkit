import { Product } from 'src/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
export declare class ProductsRepository extends Repository<Product> {
    private datasource;
    constructor(datasource: DataSource);
    getById(id: any): Promise<Product>;
    getAll(): Promise<Product[]>;
    getProductsByCategory(categoryId: number): Promise<Product[]>;
    updateProducts(productId: any, newProduct: any): Promise<import("typeorm").UpdateResult>;
    removeProducts(productId: any): Promise<import("typeorm").DeleteResult>;
}
