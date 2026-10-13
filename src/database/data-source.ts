import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { Contact } from '../contacts/entities/contact.entity.js';

try {
  process.loadEnvFile();
} catch {}

export const dbOptions = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'phonebook_usman_afzal',
};

const dataSource = new DataSource({
  type: 'postgres',
  ...dbOptions,
  entities: [Contact],
  migrations: [join(import.meta.dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
});

export default dataSource;
