import { RedisCacheModule } from '@/database/redis/redis.module';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, AddressData, ContactDetail } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AddressData, ContactDetail]),
    RedisCacheModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
})
export class UsersModule {}
