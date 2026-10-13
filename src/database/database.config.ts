import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST', 'localhost'),
  port: Number(config.get('DB_PORT') ?? 5432),
  username: config.get('DB_USERNAME', 'postgres'),
  password: config.get('DB_PASSWORD', ''),
  database: config.get('DB_DATABASE', 'phonebook_usman_afzal'),
  autoLoadEntities: true,
  synchronize: false,
});
