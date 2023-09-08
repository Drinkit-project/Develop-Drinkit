import { BadRequestException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redis = require('redis');
import 'dotenv/config';

@Injectable()
export class RedisService {
  client = redis.createClient({ url: process.env.REDIS_URL });
  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
      this.client.hgetall(key, (err, reply) => {
        if (err) {
          console.error(err);
          throw new BadRequestException();
        }
        resolve(reply);
      });
    });
  }

  async updateRanking(
    productIdList: Array<number>,
    countList: Array<number>,
    isAdd: boolean,
  ) {
    const rank = await this.hgetall('rank');

    if (isAdd) {
      if (rank) {
        const newRankList: Array<string | number> = [];
        for (let i = 0; i < productIdList.length; i++) {
          const newCount = Number(rank[productIdList[i]]) + countList[i];
          newRankList.push(productIdList[i], newCount);
        }
        await this.client.hmset('rank', newRankList);
      } else {
        const rankList: Array<string | number> = [];
        for (let i = 0; i < productIdList.length; i++) {
          rankList.push(productIdList[i], countList[i]);
        }
        await this.client.hmset('rank', rankList);
      }
    } else {
      if (rank) {
        const newRankList: Array<string | number> = [];
        for (let i = 0; i < productIdList.length; i++) {
          const newCount = Number(rank[productIdList[i]]) - countList[i];
          newRankList.push(productIdList[i], newCount);
        }
        await this.client.hmset('rank', newRankList);
      }
    }

    return;
  }

  async getRanking() {
    const rank = await this.hgetall('rank');
    return rank;
  }
}
