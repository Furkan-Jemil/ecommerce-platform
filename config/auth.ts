import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.users,
        },
        useCamelCase: true
    }),
    emailAndPassword: {
        enabled: true
    },
    user: {
        fields: {
            role: "role"
        }
    }
});

