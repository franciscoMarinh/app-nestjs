import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ApiModule } from './api/api.module';
import { winstonConfig } from './configs/winston.config';
import { DatabaseModule } from './database/database.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [DatabaseModule, WinstonModule.forRoot(winstonConfig), ApiModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
