import { Module } from '@nestjs/common';
import { typeOrmConfig } from './postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class PostgresModule {}
