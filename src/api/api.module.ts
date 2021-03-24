import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsersModule],
  exports: [],
  providers: [UserService],
  controllers: [UserController],
})
export class ApiModule {}
