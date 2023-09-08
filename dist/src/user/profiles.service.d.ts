import { ProfilesRepository } from './profiles.repository';
import ProfileDto from './dto/Profile.dto';
import { EntityManager, FindOneOptions } from 'typeorm';
import { Profile } from 'src/entities/profile.entity';
import AddressDto from './dto/address.dto';
export declare class ProfilesService {
    private profilesRepository;
    constructor(profilesRepository: ProfilesRepository);
    getProfile(userId: number): Promise<any>;
    getAddress(userId: number): Promise<{
        address: string;
        name: string;
    }[]>;
    findByFields(options: FindOneOptions<Profile>): Promise<any>;
    createProfile(userId: number, address: AddressDto, phoneNumber: string, nickname: string, name: string, manager: EntityManager): Promise<import("typeorm").InsertResult>;
    updateProfile(userId: number, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    addAddress(userId: number, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    updateAddress(userId: number, addressIdx: number, data: Partial<ProfileDto>): Promise<import("typeorm").UpdateResult>;
    delteAddress(userId: number, addressIdx: number): Promise<import("typeorm").UpdateResult>;
}
