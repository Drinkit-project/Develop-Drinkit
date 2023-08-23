import { BadRequestException, Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { AddProductDTO, CreateStoreDTO } from './DTO/create.DTO';
import { User } from 'src/entities/user.entity';
import { UpdateStoreDTO } from './DTO/update.DTO';
import { Store } from 'src/entities/store.entity';

@Injectable()
export class StoresService {
  constructor(private readonly storeRepository: StoresRepository) {}

  getStoreDetail(id: number) {
    return this.storeRepository.findStoreById(id);
  }

  createStore(data: CreateStoreDTO) {
    return this.storeRepository.createStore(data);
  }

  async addProductOnStore(user: User, data: AddProductDTO) {
    const store = await this.storeRepository.findStoreById(data.storeId);

    if (store?.userId === user.id) {
      const result = this.storeRepository.addProductOnStore(data);
      return result;
    } else {
      return false;
    }

    return;
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
}
