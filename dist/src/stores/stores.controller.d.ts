/// <reference types="multer" />
import { StoresService } from './stores.service';
import { User } from 'src/entities/user.entity';
import { AddProductDTO, CreateStoreDTO } from './DTO/create.DTO';
import { UpdateProductDTO, UpdateStoreDTO } from './DTO/update.DTO';
import { StockDTO } from './DTO/stock.DTO';
export declare class StoresController {
    private readonly storeService;
    constructor(storeService: StoresService);
    getStores(data: Array<StockDTO>): Promise<any>;
    getStoreDetail(id: number): Promise<import("../entities/store.entity").Store>;
    getMystore(userId: number): Promise<import("../entities/store.entity").Store[]>;
    createStore(file: Express.Multer.File, user: User, body: CreateStoreDTO): Promise<import("typeorm").InsertResult>;
    updateStroe(id: number, user: User, body: UpdateStoreDTO): {
        message: string;
    };
    deleteStore(id: number, user: User): Promise<{
        message: string;
    }>;
    getProductDetailInProductList(storeId: number, productId: number): Promise<import("../entities/store_product.entity").Store_Product>;
    addProductOnStore(user: User, body: AddProductDTO): Promise<false | import("typeorm").InsertResult>;
    updateProductStock(body: UpdateProductDTO, id: number): Promise<{
        message: string;
    }>;
    deleteProductInList(storeId: number, productId: number): Promise<{
        message: string;
    }>;
    seedStores(): Promise<string>;
    seedStoreProducts(): Promise<string>;
}
