import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import ProfileDto from './dto/Profile.dto';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async getProfile(userId: number) {
    const getOrdersData = await this.profilesRepository.getProfile(userId);
    return getOrdersData;
  }

  async createProfile(
    userId: number,
    address: JSON,
    phoneNumber: string,
    nickname: string,
    name: string,
    manager: EntityManager,
  ) {
    await manager
      .createQueryBuilder()
      .insert()
      .into(Store_Product, ['id', 'storeId', 'totalStock', 'productId'])
      .values(getStoreProductsData)
      .orUpdate(['totalStock'], ['id'], {
        skipUpdateIfNoValuesChanged: true,
      })
      .execute();
  }

  async updateProfile(userId: number, data: Partial<ProfileDto>) {
    const { phoneNumber, nickname } = data;
    return await this.profilesRepository.update(
      { userId },
      { phoneNumber, nickname },
    );
  }

  async addAddress(userId: number, data: Partial<ProfileDto>) {
    const { address } = data;
    return this.profilesRepository.addAddress(userId, address);
  }

  async updateAddress(
    userId: number,
    addressIdx: number,
    data: Partial<ProfileDto>,
  ) {
    const { address } = data;
    return this.profilesRepository.updateAddress(userId, addressIdx, address);
  }

  async delteAddress(userId: number, addressIdx: number) {
    return this.profilesRepository.delteAddress(userId, addressIdx);
  }
}
