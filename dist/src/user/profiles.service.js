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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const profiles_repository_1 = require("./profiles.repository");
const profile_entity_1 = require("../entities/profile.entity");
let ProfilesService = exports.ProfilesService = class ProfilesService {
    constructor(profilesRepository) {
        this.profilesRepository = profilesRepository;
    }
    async getProfile(userId) {
        const profile = await this.profilesRepository.getProfile(userId);
        return profile;
    }
    async getAddress(userId) {
        const address = await this.profilesRepository.getAddress(userId);
        return address;
    }
    async findByFields(options) {
        return await this.profilesRepository.findOne(options);
    }
    async createProfile(userId, address, phoneNumber, nickname, name, manager) {
        return await manager
            .createQueryBuilder()
            .insert()
            .into(profile_entity_1.Profile)
            .values({
            userId,
            address: JSON.stringify([address]),
            phoneNumber,
            nickname,
            name,
        })
            .execute();
    }
    async updateProfile(userId, data) {
        const { phoneNumber, nickname } = data;
        return await this.profilesRepository.update({ userId }, { phoneNumber, nickname });
    }
    addAddress(userId, data) {
        const { address } = data;
        return this.profilesRepository.addAddress(userId, address);
    }
    async updateAddress(userId, addressIdx, data) {
        const { address } = data;
        return this.profilesRepository.updateAddress(userId, address, addressIdx);
    }
    async delteAddress(userId, addressIdx) {
        return this.profilesRepository.deleteAddress(userId, addressIdx);
    }
};
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiles_repository_1.ProfilesRepository])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map