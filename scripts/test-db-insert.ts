import 'dotenv/config';
import { db } from '../db';
import * as schema from '../db/schema';
import { v4 as uuidv4 } from 'uuid';

(async () => {
  try {
    const id = uuidv4();
    console.log('Trying to insert with id', id);
    const res = await db.insert(schema.users).values({
      id,
      name: 'debug',
      email: `debug${Date.now()}@example.com`,
      emailVerified: false,
    });
    console.log('insert result', res);
  } catch (e) {
    console.error('error inserting', e);
  } finally {
    process.exit(0);
  }
})();
