import { StoresRepository } from './stores.repository';
import { AddProductDTO, CreateStoreDTO } from './DTO/create.DTO';
import { User } from 'src/entities/user.entity';
import { UpdateProductDTO, UpdateStoreDTO } from './DTO/update.DTO';
import { Store } from 'src/entities/store.entity';
import { Store_ProductRepository } from './store_product.repository';
import { Store_Product } from 'src/entities/store_product.entity';
import StockDTO from './DTO/stock.DTO';
export declare class StoresService {
    private readonly storeRepository;
    private readonly storeProductRepository;
    constructor(storeRepository: StoresRepository, storeProductRepository: Store_ProductRepository);
    getStoreDetail(id: number): Promise<Store>;
    getMystore(userId: number): Promise<Store[]>;
    getStores(body: Array<StockDTO>): Promise<any>;
    createStore(data: CreateStoreDTO, userId: number): Promise<import("typeorm").InsertResult>;
    updateStore(storeId: number, user: User, data: UpdateStoreDTO): Promise<boolean>;
    deleteStore(storeId: number, user: User): Promise<boolean>;
    getProductDetailByStoreIdAndProductId(storeId: number, productId: number): Promise<Store_Product>;
    addProductOnStore(user: User, data: AddProductDTO): Promise<false | import("typeorm").InsertResult>;
    seedProductOnStore(data: AddProductDTO): Promise<import("typeorm").InsertResult>;
    updateProductStock(data: UpdateProductDTO, productId: number): Promise<number>;
    deleteProductInList(storeId: number, productId: number): Promise<number>;
}
