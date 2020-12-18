import { Module } from '@nestjs/common';
import { typeOrmConfig } from '@/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
})
export class PostgresModule {}
