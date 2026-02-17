import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

const isLocal = process.env.USE_LOCAL_DB === 'true';

export default defineConfig({
  schema: isLocal ? "./db/schema_sqlite.ts" : "./db/schema/*",
  out: "./db/migrations",
  dialect: isLocal ? "sqlite" : "postgresql",
  dbCredentials: {
    url: isLocal ? "local.db" : process.env.DATABASE_URL!,
  },
});
