import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { RedisKeys } from './redis.interface';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<string | undefined> {
    return this.cache.get(key);
  }

  async set(key: RedisKeys, value: any, options: CachingConfig) {
    await this.cache.set(key, value, options);
  }
}
