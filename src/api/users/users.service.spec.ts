import { RedisCacheService } from '../../database/redis/redisCache.service';
import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressData, ContactDetail, User } from './entities';
import { UsersService } from './users.service';
import JsonClient from '../../commons/services/jsonPlaceholdClient';
import TestUtils from './testUtils/generateUser';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    findUsersInRedis: jest.fn(),
    findUsersInJsonPlaceHold: jest.fn(),
    findAllUsers: jest.fn(),
    saveDataUsers: jest.fn(),
  };

  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockLogger = {
    error: jest.fn(),
  };

  const mockJsonClient = {
    api: {
      get: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(AddressData),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ContactDetail),
          useValue: mockRepository,
        },
        {
          provide: RedisCacheService,
          useValue: mockRedis,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
        {
          provide: JsonClient,
          useValue: mockJsonClient,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUsersInRedis', () => {
    it('should return users in Redis cache', async () => {
      const usersMock = TestUtils.generateUser();
      mockRedis.get.mockReturnValue(JSON.stringify(usersMock));
      const users = await service.findUsersInRedis();
      expect(users).toStrictEqual(usersMock);
    });

    it('should not return users in Redis cache', async () => {
      mockRedis.get.mockReturnValue(undefined);
      const users = await service.findUsersInRedis();
      expect(users).not.toBeDefined();
    });

    it('should not return users in Redis cache', async () => {
      mockRedis.get.mockRejectedValue(new Error('generic'));
      const users = await service.findUsersInRedis();
      expect(users).not.toBeDefined();
    });
  });

  describe('findUsersInJsonPlaceHold', () => {
    it('should return users of jsonPlaceHold', async () => {
      mockJsonClient.api.get.mockResolvedValue({ data: { name: 'francisco' } });
      const users = await service.findUsersInJsonPlaceHold();
      expect(users).toBeDefined();
    });
  });
});
