import { RedisCacheService } from '@/database/redis/redisCache.service';
import { jsonApi } from '@/services/jsonPlaceholdApi';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async findUsersInRedis(): Promise<Array<User>> {
    const users = await this.redisCacheService.get('users');
    return users && JSON.parse(users);
  }

  async findUsersInJsonPlaceHold(): Promise<Array<User>> {
    const users = await jsonApi.get<Array<User>>('/users');
    return users.data;
  }

  async findAllUsersCached(): Promise<Array<User>> {
    let users: Array<User>;
    users = await this.findUsersInRedis();
    if (!users) {
      users = await this.findUsersInJsonPlaceHold();
      await this.redisCacheService.set('users', JSON.stringify(users), {
        ttl: 20,
      });
    }
    return users;
  }

  async findAllUsers(): Promise<Array<User>> {
    const users = await this.findAllUsersCached();

    return users;
  }
}
