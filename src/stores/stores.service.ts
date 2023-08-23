import { BadRequestException, Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { CreateStoreDTO } from './DTO/create.DTO';
import { User } from 'src/entities/user.entity';
import { UpdateStoreDTO } from './DTO/update.DTO';

@Injectable()
export class StoresService {
  constructor(private readonly storeRepository: StoresRepository) {}

  getStoreDetail(id: number) {
    return this.storeRepository.findStoreById(id);
  }

  createStore(data: CreateStoreDTO, id: number) {
    const obj = {
      userId: id,
      ...data,
    };

    return this.storeRepository.createStore(obj);
  }

  async updateStore(storeId: number, user: User, data: UpdateStoreDTO) {
    const store = await this.storeRepository.findStoreById(storeId);

    if (store?.userId === user.id) {
      return;
    } else {
      throw new BadRequestException('It only can access store owner.');
    }
  }

  async deleteStore(storeId: number, user: User) {
    const store = await this.storeRepository.findStoreById(storeId);

    if (store?.userId === user.id) {
      return;
    } else {
      throw new BadRequestException('It only can access store owner.');
    }
  }
}
