import { Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import ProfileDto from './dto/Profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async getProfile(userId: number) {
    const getOrdersData = await this.profilesRepository.getProfile(userId);
    return getOrdersData;
  }

  async createProfile(userId: number, data: ProfileDto) {
    const { address, phoneNumber, nickname, name } = data;
    return await this.profilesRepository.insert({
      userId,
      address,
      phoneNumber,
      nickname,
      name,
    });
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
