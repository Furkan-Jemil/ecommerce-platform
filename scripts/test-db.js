import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

async function testConnection() {
    const isLocal = process.env.USE_LOCAL_DB === 'true';

    if (isLocal) {
        console.log('Testing local SQLite connection...');
        try {
            const sqlite = new Database('local.db');
            const db = drizzleSqlite(sqlite);
            const result = sqlite.prepare('SELECT 1 as test').get();
            console.log('Query result:', result);
            console.log('LOCAL DB CONNECTION SUCCESSFUL');
        } catch (error) {
            console.error('LOCAL DB CONNECTION FAILED:');
            console.error(error);
        }
        return;
    }

    const url = process.env.DATABASE_URL;
    console.log('Testing connection to Neon:', url?.split('@')[1]); // Log host only for privacy

    if (!url) {
        console.error('DATABASE_URL is not defined');
        return;
    }

    try {
        const sql = neon(url);
        const db = drizzleNeon(sql);

        console.log('Attempting to query Neon...');
        const result = await sql`SELECT 1 as test`;
        console.log('Query result:', result);
        console.log('NEON DB CONNECTION SUCCESSFUL');
    } catch (error) {
        console.error('NEON DB CONNECTION FAILED:');
        console.error(error);
    }
}

testConnection();
