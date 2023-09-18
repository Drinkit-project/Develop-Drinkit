"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const stores_repository_1 = require("./stores.repository");
const store_entity_1 = require("../entities/store.entity");
const store_product_repository_1 = require("./store_product.repository");
const store_product_entity_1 = require("../entities/store_product.entity");
let StoresService = exports.StoresService = class StoresService {
    constructor(storeRepository, storeProductRepository) {
        this.storeRepository = storeRepository;
        this.storeProductRepository = storeProductRepository;
    }
    getStoreDetail(id) {
        return this.storeRepository.findStoreById(id);
    }
    getMystore(userId) {
        return this.storeRepository.find({ where: { userId } });
    }
    getStores(body) {
        return this.storeRepository.findStoreByStock(body);
    }
    createStore(data, userId) {
        return this.storeRepository.createStore(data, userId);
    }
    async updateStore(storeId, user, data) {
        const store = await this.storeRepository.findStoreById(storeId);
        if (store?.userId === user.id) {
            const updatedStore = await this.storeRepository
                .createQueryBuilder()
                .update(store)
                .set(data)
                .execute();
            if (updatedStore.affected === 1)
                return true;
            return false;
        }
        else {
            throw new common_1.BadRequestException('It only can access store owner.');
        }
    }
    async deleteStore(storeId, user) {
        const store = await this.storeRepository.findStoreById(storeId);
        if (store?.userId === user.id) {
            const deletedStore = await this.storeRepository
                .createQueryBuilder()
                .delete()
                .from(store_entity_1.Store)
                .where('id = :id', { id: storeId })
                .execute();
            if (deletedStore.affected === 1)
                return true;
            return false;
        }
        else {
            throw new common_1.BadRequestException('It only can access store owner.');
        }
    }
    getProductDetailByStoreIdAndProductId(storeId, productId) {
        return this.storeProductRepository.getProductDetailByStoreIdAndProductId(storeId, productId);
    }
    async addProductOnStore(user, data) {
        const store = await this.storeRepository.findStoreById(data.storeId);
        if (store?.userId === user.id) {
            const result = this.storeProductRepository.addProductOnStore(data);
            return result;
        }
        else {
            return false;
        }
    }
    async seedProductOnStore(data) {
        const result = this.storeProductRepository.addProductOnStore(data);
        return result;
    }
    async updateProductStock(data, productId) {
        if (!data.upDown)
            data.updateStock *= -1;
        const result = await this.storeProductRepository
            .createQueryBuilder('store_product')
            .update(store_product_entity_1.Store_Product)
            .set({ storeStock: () => `storeStock + ${data.updateStock}` })
            .where('storeId = :storeId', { storeId: data.storeId })
            .andWhere('productId = :productId', { productId })
            .execute();
        return result.affected;
    }
    async deleteProductInList(storeId, productId) {
        const result = await this.storeProductRepository
            .createQueryBuilder()
            .delete()
            .from(store_product_entity_1.Store_Product)
            .where('storeId = :storeId', { storeId })
            .andWhere('productId = :productId', { productId })
            .execute();
        return result.affected;
    }
};
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stores_repository_1.StoresRepository,
        store_product_repository_1.Store_ProductRepository])
], StoresService);
//# sourceMappingURL=stores.service.js.map