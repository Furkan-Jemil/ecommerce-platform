import Database from "better-sqlite3";

const db = new Database("local.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    stock INTEGER DEFAULT 0 NOT NULL,
    image_url TEXT,
    category TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )
`,
).run();

console.log("Products table created (if it did not exist).");
