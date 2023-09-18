import { Profile } from '../entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import AddressDto from './dto/address.dto';
export declare class ProfilesRepository extends Repository<Profile> {
    private datasource;
    constructor(datasource: DataSource);
    addressParse(address: string): Promise<Array<{
        address: string;
        name: string;
    }>>;
    getProfile(userId: number): Promise<any>;
    getAddress(userId: number): Promise<{
        address: string;
        name: string;
    }[]>;
    addAddress(userId: number, newAddress: AddressDto): Promise<import("typeorm").UpdateResult>;
    updateOrderAddress(userId: number, addressIdx: number): Promise<import("typeorm").UpdateResult>;
    updateAddress(userId: number, newAddress: AddressDto, addressIdx: number): Promise<import("typeorm").UpdateResult>;
    deleteAddress(userId: number, addressIdx: number): Promise<import("typeorm").UpdateResult>;
}
