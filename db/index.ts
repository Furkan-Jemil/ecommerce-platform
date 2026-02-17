import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import * as sqliteSchema from './schema_sqlite';

const isLocal = process.env.USE_LOCAL_DB === 'true';

export const db: any = isLocal
    ? drizzleSqlite(new Database('local.db'), { schema: sqliteSchema })
    : drizzleNeon(neon(process.env.DATABASE_URL!), { schema });
