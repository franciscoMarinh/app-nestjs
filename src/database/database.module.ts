import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { RedisCacheModule } from './redis/redis.module';

@Module({
  imports: [RedisCacheModule, PostgresModule],
})
export class DatabaseModule {}
