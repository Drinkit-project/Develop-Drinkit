import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { RedisCache } from './redis.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  private redisClient: RedisClient;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
    this.redisClient = this.cacheManager.store.getClient();
  }

  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
      this.redisClient.hgetall(key, (err, reply) => {
        if (err) {
          console.error(err);
          throw new BadRequestException();
        }
        resolve(reply);
      });
    });
  }
}
