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
exports.ProfilesRepository = void 0;
const common_1 = require("@nestjs/common");
const profile_entity_1 = require("../entities/profile.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let ProfilesRepository = exports.ProfilesRepository = class ProfilesRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(profile_entity_1.Profile, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async addressParse(address) {
        return (address = JSON.parse(address));
    }
    async getProfile(userId) {
        const profile = await this.createQueryBuilder()
            .innerJoin(user_entity_1.User, 'user', 'profile.userId = user.id')
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
            .from(profile_entity_1.Profile, 'profile')
            .where(`profile.userId = ${userId}`)
            .getRawOne();
        return profile;
    }
    async getAddress(userId) {
        const addressString = await this.createQueryBuilder()
            .select('profile.address')
            .from(profile_entity_1.Profile, 'profile')
            .where(`profile.userId = ${userId}`)
            .getOne();
        const address = await this.addressParse(addressString.address);
        return address;
    }
    async addAddress(userId, newAddress) {
        const address = await this.getAddress(userId);
        address.push(newAddress);
        return await this.createQueryBuilder()
            .update(profile_entity_1.Profile)
            .set({ address: JSON.stringify(address) })
            .where(`userId = :userId`, { userId })
            .execute();
    }
    async updateOrderAddress(userId, addressIdx) {
        const address = await this.getAddress(userId);
        const [tempAddress] = address.splice(addressIdx, 1);
        address.unshift(tempAddress);
        return await this.createQueryBuilder()
            .update(profile_entity_1.Profile)
            .set({ address: JSON.stringify(address) })
            .where(`userId = :userId`, { userId })
            .execute();
    }
    async updateAddress(userId, newAddress, addressIdx) {
        const address = await this.getAddress(userId);
        address[addressIdx] = newAddress;
        return await this.createQueryBuilder()
            .update(profile_entity_1.Profile)
            .set({ address: JSON.stringify(address) })
            .where(`userId = :userId`, { userId })
            .execute();
    }
    async deleteAddress(userId, addressIdx) {
        const address = await this.getAddress(userId);
        address.splice(addressIdx, 1);
        return await this.createQueryBuilder()
            .update(profile_entity_1.Profile)
            .set({ address: JSON.stringify(address) })
            .where(`userId = :userId`, { userId })
            .execute();
    }
};
exports.ProfilesRepository = ProfilesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProfilesRepository);
//# sourceMappingURL=profiles.repository.js.map