import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

const isLocal = process.env.USE_LOCAL_DB === "true";

// sqliteSchema is only needed for local development; require lazily to avoid bundling on Vercel
let sqliteSchema: typeof import("../db/schema_sqlite");
if (isLocal) {
  sqliteSchema = require("../db/schema_sqlite");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: isLocal ? "sqlite" : "pg",
    schema: isLocal
      ? {
          user: sqliteSchema!.users,
          session: sqliteSchema!.sessions,
          account: sqliteSchema!.accounts,
          verification: sqliteSchema!.verifications,
        }
      : {
          user: schema.users,
          session: schema.sessions,
          account: schema.accounts,
          verification: schema.verifications,
        },
    camelCase: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    // any plugins
  ],
});
