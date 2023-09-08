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
exports.SubscribesRepository = void 0;
const common_1 = require("@nestjs/common");
const subscribe_entity_1 = require("../entities/subscribe.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
let SubscribesRepository = exports.SubscribesRepository = class SubscribesRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(subscribe_entity_1.Subscribe, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async postSubscribe(userId, isPaid, address) {
        const postSubscribeData = await this.createQueryBuilder()
            .insert()
            .into(subscribe_entity_1.Subscribe)
            .values([{ userId, isPaid, address }])
            .execute();
        return postSubscribeData;
    }
    async getSubscribe(userId) {
        const getSubscribeData = await this.createQueryBuilder('subscribe')
            .where('subscribe.userId = :userId', { userId })
            .getOne();
        return getSubscribeData;
    }
    async getAllSubscribe() {
        const getAllSubscribeData = await this.createQueryBuilder('subscribe')
            .leftJoinAndSelect(user_entity_1.User, 'user', 'user.id = subscribe.userId')
            .select([
            'subscribe.userId',
            'subscribe.isPaid',
            'subscribe.address',
            'user.email',
        ])
            .getRawMany();
        return getAllSubscribeData;
    }
    async getSelectSubscribe() {
        const getSelectSubscribeData = await this.createQueryBuilder('subscribe')
            .leftJoinAndSelect(user_entity_1.User, 'user', 'user.id = subscribe.userId')
            .select(['subscribe.userId', 'subscribe.isPaid', 'subscribe.address'])
            .where('subscribe.isPaid = true')
            .andWhere('user.point >= 29900')
            .getRawMany();
        return getSelectSubscribeData;
    }
    async getSendMailSubscribe() {
        const getSendMailSubscribeData = await this.createQueryBuilder('subscribe')
            .leftJoinAndSelect(user_entity_1.User, 'user', 'user.id = subscribe.userId')
            .select([
            'subscribe.userId',
            'subscribe.isPaid',
            'subscribe.address',
            'user.email',
        ])
            .where('subscribe.isPaid = true')
            .andWhere('user.point < 29900')
            .getRawMany();
        return getSendMailSubscribeData;
    }
    async updateSubscribe(userId, isPaid, address) {
        const updateSubscribeData = await this.createQueryBuilder()
            .update(subscribe_entity_1.Subscribe)
            .set({ isPaid, address })
            .where('userId = :userId', { userId })
            .execute();
        return updateSubscribeData;
    }
    async deleteSubscribe(userId) {
        const deleteSubscribe = await this.createQueryBuilder()
            .delete()
            .from(subscribe_entity_1.Subscribe)
            .where('userId = :userId', { userId })
            .execute();
        return deleteSubscribe;
    }
};
exports.SubscribesRepository = SubscribesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SubscribesRepository);
//# sourceMappingURL=subscribes.repository.js.map