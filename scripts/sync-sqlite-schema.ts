import "dotenv/config";
import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/schema_sqlite";

async function syncSchema() {
  const sqlite = new Database("local.db");
  const db = drizzleSqlite(sqlite, { schema });
  // This will create tables if they do not exist
  // Drizzle ORM does not auto-migrate, so we must run a dummy query to trigger table creation
  try {
    await db.select().from(schema.users).all();
    await db.select().from(schema.products).all();
    console.log("SQLite schema synced (users, products)");
  } catch (error) {
    console.error("Error syncing schema:", error);
  } finally {
    process.exit();
  }
}

syncSchema();
