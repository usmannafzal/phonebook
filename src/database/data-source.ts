import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { Contact } from '../contacts/entities/contact.entity.js';

try {
  process.loadEnvFile();
} catch {}

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'phonebook_usman_afzal',
  entities: [Contact],
  migrations: [join(import.meta.dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
});

export default dataSource;
