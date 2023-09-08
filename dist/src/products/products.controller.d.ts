/// <reference types="multer" />
import { ProductsService } from './products.service';
import { UpdateProductsRequestDto } from './dto/products.request.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getProductsByCategory(categoryId: any): Promise<import("../entities/product.entity").Product[]>;
    getProductsById(param: any): Promise<import("../entities/product.entity").Product>;
    createProducts(user: any, file: Express.Multer.File, body: any): Promise<string>;
    updateProducts(user: any, param: any, body: UpdateProductsRequestDto): Promise<string>;
    removeProducts(user: any, param: any): Promise<string>;
}
