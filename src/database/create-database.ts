import { Client } from 'pg';
import { dbOptions } from './data-source.js';

async function createDatabase() {
  const { host, port, username, password, database } = dbOptions;

  const client = new Client({
    host,
    port,
    user: username,
    password,
    database: 'postgres',
  });
  await client.connect();
  try {
    const { rowCount } = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [database],
    );
    if (rowCount) {
      console.log(`Database "${database}" already exists.`);
      return;
    }
    await client.query(`CREATE DATABASE "${database.replace(/"/g, '""')}"`);
    console.log(`Database "${database}" created.`);
  } finally {
    await client.end();
  }
}

await createDatabase();
