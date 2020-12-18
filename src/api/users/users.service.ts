import { RedisCacheService } from '@/database/redis/redisCache.service';
import { jsonClient } from '@/services/jsonPlaceholdClient';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly redisCacheService: RedisCacheService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async findUsersInRedis(): Promise<Array<User>> {
    this.logger.error('redis cache');
    const users = await this.redisCacheService.get('users');
    return users && JSON.parse(users);
  }

  async findUsersInJsonPlaceHold(): Promise<Array<User>> {
    const users = await jsonClient.get<Array<User>>('/users');
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
