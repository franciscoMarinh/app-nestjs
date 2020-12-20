import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const redisConfig = async (configService: ConfigService) => ({
  store: redisStore,
  host: configService.get('DB_REDIS_HOST', 'localhost'),
  port: configService.get('DB_REDIS_PORT', 'localhost'),
});
