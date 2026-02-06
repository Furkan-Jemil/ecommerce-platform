import { pgTable, uuid, numeric, timestamp, pgEnum, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const orderStatusEnum = pgEnum("order_status", ["PENDING", "PAID", "CANCELLED"]);

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").default("PENDING").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
    productId: uuid("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    priceAtPurchase: numeric("price_at_purchase", { precision: 10, scale: 2 }).notNull(),
});
