import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import AddressDto from './dto/address.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProfilesRepository extends Repository<Profile> {
  constructor(private datasource: DataSource) {
    super(Profile, datasource.createEntityManager());
  }

  async addressParse(
    address: string,
  ): Promise<Array<{ address: string; name: string }>> {
    return (address = JSON.parse(address));
  }

  async getProfile(userId: number) {
    const profile = await this.createQueryBuilder()
      .innerJoin(User, 'user', 'profile.userId = user.id')
      .select([
        'user.email AS "email"',
        'user.createdAt AS "createdAt"',
        'user.isAdmin AS "isAdmin"',
        'user.isPersonal AS "isPersonal"',
        'user.point AS "point"',
        'profile.userId AS "userId"',
        'profile.nickname AS "nickname"',
        'profile.phoneNumber AS "phoneNumber"',
        'profile.name AS "name"',
        'profile.address AS "address"',
      ])
      .from(Profile, 'profile')
      .where(`profile.userId = ${userId}`)
      .getRawOne();

    return profile;
  }

  async getAddress(userId: number) {
    const addressString = await this.createQueryBuilder()
      .select('profile.address')
      .from(Profile, 'profile')
      .where(`profile.userId = ${userId}`)
      .getOne();

    const address = await this.addressParse(addressString.address);

    return address;
  }

  async addAddress(userId: number, newAddress: AddressDto) {
    const address = await this.getAddress(userId);
    address.push(newAddress);

    return await this.createQueryBuilder()
      .update(Profile)
      .set({ address: JSON.stringify(address) })
      .where(`userId = :userId`, { userId })
      .execute();
  }

  async updateOrderAddress(userId: number, addressIdx: number) {
    const address = await this.getAddress(userId);
    const [tempAddress] = address.splice(addressIdx, 1);
    address.unshift(tempAddress);

    return await this.createQueryBuilder()
      .update(Profile)
      .set({ address: JSON.stringify(address) })
      .where(`userId = :userId`, { userId })
      .execute();
  }

  async updateAddress(
    userId: number,
    newAddress: AddressDto,
    addressIdx: number,
  ) {
    const address = await this.getAddress(userId);
    address[addressIdx] = newAddress;
    return await this.createQueryBuilder()
      .update(Profile)
      .set({ address: JSON.stringify(address) })
      .where(`userId = :userId`, { userId })
      .execute();
  }

  async deleteAddress(userId: number, addressIdx: number) {
    const address = await this.getAddress(userId);
    address.splice(addressIdx, 1);
    return await this.createQueryBuilder()
      .update(Profile)
      .set({ address: JSON.stringify(address) })
      .where(`userId = :userId`, { userId })
      .execute();
  }
}
