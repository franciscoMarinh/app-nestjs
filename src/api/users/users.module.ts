import { RedisCacheModule } from '@/database/redis/redis.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), RedisCacheModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
