import { ProductsRepository } from './products.repository';
import { OpenSearchService } from 'src/open-search/open-search.service';
export declare class ProductsService {
    private productsRepository;
    private openSearchService;
    constructor(productsRepository: ProductsRepository, openSearchService: OpenSearchService);
    getProducts(): Promise<import("../entities/product.entity").Product[]>;
    getProductsByCategory(categoryId: number): Promise<import("../entities/product.entity").Product[]>;
    getProductsById(id: any): Promise<import("../entities/product.entity").Product>;
    createProducts(newProduct: any): Promise<import("typeorm").InsertResult>;
    updateProducts(productId: any, newProduct: any): Promise<import("typeorm").UpdateResult>;
    removeProducts(productId: any): Promise<import("typeorm").DeleteResult>;
}
