"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis = require('redis');
const client = redis.createClient();
let RedisService = exports.RedisService = class RedisService {
    async hgetall(key) {
        return new Promise((resolve, reject) => {
            client.hgetall(key, (err, reply) => {
                if (err) {
                    console.error(err);
                    throw new common_1.BadRequestException();
                }
                resolve(reply);
            });
        });
    }
    async updateRanking(productIdList, countList, isAdd) {
        const rank = await this.hgetall('rank');
        if (isAdd) {
            if (rank) {
                const newRankList = [];
                for (let i = 0; i < productIdList.length; i++) {
                    const newCount = Number(rank[productIdList[i]]) + countList[i];
                    newRankList.push(productIdList[i], newCount);
                }
                await client.hmset('rank', newRankList);
            }
            else {
                const rankList = [];
                for (let i = 0; i < productIdList.length; i++) {
                    rankList.push(productIdList[i], countList[i]);
                }
                await client.hmset('rank', rankList);
            }
        }
        else {
            if (rank) {
                const newRankList = [];
                for (let i = 0; i < productIdList.length; i++) {
                    const newCount = Number(rank[productIdList[i]]) - countList[i];
                    newRankList.push(productIdList[i], newCount);
                }
                await client.hmset('rank', newRankList);
            }
        }
        return;
    }
    async getRanking() {
        const rank = await this.hgetall('rank');
        return rank;
    }
};
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map