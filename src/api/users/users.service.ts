import { RedisCacheService } from '../../database/redis/redisCache.service';
import JsonClient from '../../commons/services/jsonPlaceholdClient';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressData, ContactDetail, User } from './entities';
import { IUser, IUserFields } from './users.interfaces';
import { filterByName } from '../../commons/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(AddressData)
    private addressDataRepository: Repository<AddressData>,
    @InjectRepository(ContactDetail)
    private contactDetailRepository: Repository<ContactDetail>,
    private readonly redisCacheService: RedisCacheService,
    @Inject(Logger) private readonly logger: LoggerService,
    @Inject(JsonClient) private readonly jsonClient: JsonClient,
  ) {}

  public async findUsersInRedis(): Promise<void | IUser[]> {
    try {
      const users = await this.redisCacheService.get('users');
      return users && JSON.parse(users);
    } catch (error) {
      this.logger.error(
        'Error ao consultar usuarios no redis cache',
        'userService',
        'Database',
      );
      return;
    }
  }

  public async findUsersInJsonPlaceHold(): Promise<void | IUser[]> {
    try {
      const users = await this.jsonClient.api.get<Array<IUser>>('/users');
      return users.data;
    } catch (error) {
      this.logger.error(
        'Error ao consultar usuarios no JSON Placehold cache',
        'userService',
        'Database',
      );
      return;
    }
  }

  public async findAllUsers(): Promise<void | IUser[]> {
    let users: IUser[] | void;
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

  public async saveDataUsers(): Promise<void | any> {
    const users = await this.findAllUsers();
    if (!users) return;

    const { user, addressData, contactDetail } = users
      .sort(filterByName)
      .reduce(
        (acc: IUserFields, user) => ({
          addressData: [
            ...acc.addressData,
            {
              city: user.address.city,
              geo: JSON.stringify(user.address.geo),
              street: user.address.street,
              suite: user.address.suite,
              zipcode: user.address.zipcode,
              user,
            },
          ],
          contactDetail: [
            ...acc.contactDetail,
            {
              email: user.email,
              phone: user.phone,
              user,
            },
          ],
          user: [
            ...acc.user,
            {
              id: user.id,
              name: user.name,
              username: user.username,
              website: user.website,
            },
          ],
        }),
        {
          addressData: [],
          contactDetail: [],
          user: [],
        },
      );

    const promsiesToResolve = [
      this.usersRepository.save(user),
      this.addressDataRepository.save(addressData),
      this.contactDetailRepository.save(contactDetail),
    ];

    try {
      await Promise.all(promsiesToResolve);
    } catch (error) {
      throw error;
    }
  }
}
