import { BadRequestException, Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { AddProductDTO, CreateStoreDTO } from './DTO/create.DTO';
import { User } from 'src/entities/user.entity';
import { UpdateProductDTO, UpdateStoreDTO } from './DTO/update.DTO';
import { Store } from 'src/entities/store.entity';
import { Store_ProductRepository } from './store_product.repository';
import { Store_Product } from 'src/entities/store_product.entity';

@Injectable()
export class StoresService {
  constructor(
    private readonly storeRepository: StoresRepository,
    private readonly storeProductRepository: Store_ProductRepository,
  ) {}

  getStoreDetail(id: number) {
    return this.storeRepository.findStoreById(id);
  }

  createStore(data: CreateStoreDTO) {
    return this.storeRepository.createStore(data);
  }

  async updateStore(storeId: number, user: User, data: UpdateStoreDTO) {
    const store = await this.storeRepository.findStoreById(storeId);
    if (store?.userId === user.id) {
      const updatedStore = await this.storeRepository
        .createQueryBuilder()
        .update(store)
        .set(data)
        .execute();

      if (updatedStore.affected === 1) return true;
      return false;
    } else {
      throw new BadRequestException('It only can access store owner.');
    }
  }

  async deleteStore(storeId: number, user: User) {
    const store = await this.storeRepository.findStoreById(storeId);

    if (store?.userId === user.id) {
      const deletedStore = await this.storeRepository
        .createQueryBuilder()
        .delete()
        .from(Store)
        .where('id = :id', { id: storeId })
        .execute();
      if (deletedStore.affected === 1) return true;
      return false;
    } else {
      throw new BadRequestException('It only can access store owner.');
    }
  }

  /**
    Store_Product API
   */

  getProductDetailByStoreIdAndProductId(storeId: number, productId: number) {
    return this.storeProductRepository.getProductDetailByStoreIdAndProductId(
      storeId,
      productId,
    );
  }

  async addProductOnStore(user: User, data: AddProductDTO) {
    const store = await this.storeRepository.findStoreById(data.storeId);

    if (store?.userId === user.id) {
      const result = this.storeProductRepository.addProductOnStore(data);
      return result;
    } else {
      return false;
    }
  }

  async updateProductStock(data: UpdateProductDTO, productId: number) {
    if (!data.upDown) data.updateStock *= -1;

    const result = await this.storeProductRepository
      .createQueryBuilder('store_product')
      .update(Store_Product)
      .set({ storeStock: () => `storeStock + ${data.updateStock}` })
      .where('storeId = :storeId', { storeId: data.storeId })
      .andWhere('productId = :productId', { productId })
      .execute();

    return result.affected;
  }

  async deleteProductInList(storeId: number, productId: number) {
    const result = await this.storeProductRepository
      .createQueryBuilder()
      .delete()
      .from(Store_Product)
      .where('storeId = :storeId', { storeId })
      .andWhere('productId = :productId', { productId })
      .execute();
    return result.affected;
  }
}
