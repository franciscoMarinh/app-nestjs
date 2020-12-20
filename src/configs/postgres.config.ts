import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_PG_HOST'),
  port: parseInt(configService.get('DB_PG_PORT'), 10),
  username: configService.get('DB_PG_USER'),
  password: configService.get('DB_PG_PASSWORD'),
  database: configService.get('DB_PG_SCHEMA'),
  entities: [__dirname + '../../**/*.entity.{js,ts}'],
  synchronize: configService.get('NODE_ENV') === 'development',
});
