import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import ProfileDto from './dto/Profile.dto';
import { EntityManager, FindOneOptions } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';
import AddressDto from './dto/address.dto';

@Injectable()
export class ProfilesService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async getProfile(userId: number) {
    const profile = await this.profilesRepository.getProfile(userId);
    return profile;
  }

  async getAddress(userId: number) {
    const address = await this.profilesRepository.getAddress(userId);
    return address;
  }

  //field에 따른 조회
  async findByFields(options: FindOneOptions<Profile>): Promise<any> {
    return await this.profilesRepository.findOne(options);
  }

  async createProfile(
    userId: number,
    address: AddressDto,
    phoneNumber: string,
    nickname: string,
    name: string,
    manager: EntityManager,
  ) {
    return await manager
      .createQueryBuilder()
      .insert()
      .into(Profile)
      .values({
        userId,
        address: JSON.stringify([address]),
        phoneNumber,
        nickname,
        name,
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

  addAddress(userId: number, data: Partial<ProfileDto>) {
    const { address } = data;

    return this.profilesRepository.addAddress(userId, address);
  }

  async updateAddress(
    userId: number,
    addressIdx: number,
    data: Partial<ProfileDto>,
  ) {
    const { address } = data;
    return this.profilesRepository.updateAddress(userId, address, addressIdx);
  }

  async delteAddress(userId: number, addressIdx: number) {
    return this.profilesRepository.deleteAddress(userId, addressIdx);
  }
}
