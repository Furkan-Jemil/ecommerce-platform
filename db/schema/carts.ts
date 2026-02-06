import { pgTable, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const carts = pgTable("carts", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cartItems = pgTable("cart_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    cartId: uuid("cart_id").references(() => carts.id, { onDelete: "cascade" }).notNull(),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
    quantity: integer("quantity").notNull(),
});
