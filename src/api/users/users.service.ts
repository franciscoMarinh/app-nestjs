import { RedisCacheService } from '@/database/redis/redisCache.service';
import { jsonClient } from '@/commons/services/jsonPlaceholdClient';
import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
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

  private async findUsersInRedis(): Promise<void | User[]> {
    try {
      const users = await this.redisCacheService.get('users');
      return users && JSON.parse(users);
    } catch (error) {
      this.logger.error(
        'Error ao consultar usuarios no redis cache',
        'userService',
        'Database',
      );
    }
  }

  private async findUsersInJsonPlaceHold(): Promise<void | User[]> {
    try {
      const users = await jsonClient.get<Array<User>>('/users');
      return users.data;
    } catch (error) {
      this.logger.error(
        'Error ao consultar usuarios no JSON Placehold cache',
        'userService',
        'Database',
      );
    }
  }

  private async findAllUsersCached(): Promise<void | User[]> {
    let users: Array<User> | void;
    users = await this.findUsersInRedis();
    if (!users) {
      users = await this.findUsersInJsonPlaceHold();

      users &&
        (await this.redisCacheService.set('users', JSON.stringify(users), {
          ttl: 20,
        }));
    }
    return users;
  }

  public async findAllUsers(): Promise<void | User[]> {
    const users = await this.findAllUsersCached();
    if (!users) {
      throw new HttpException(
        'Desculpe, houve um problema ao consultar os usuarios, Por favor tente novamente mais tarde.',
        403,
      );
    }
    return users;
  }
}
