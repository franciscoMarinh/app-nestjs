import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../../src/api/users/users.module';
import { UsersService } from '../../../src/api/users/users.service';
import { INestApplication } from '@nestjs/common';

describe('Users', () => {
  let app: INestApplication;
  // eslint-disable-next-line prefer-const
  let userService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      data: userService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
