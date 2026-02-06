import type { Request, Response } from "express";
import { db } from "../../db";
import { orders, orderItems, carts, cartItems, products } from "../../db/schema";
import { sendResponse } from "../utils/response";
import { eq, desc } from "drizzle-orm";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        // 1. Get user's cart
        const [userCart] = await db.select().from(carts).where(eq(carts.userId, user.id));
        if (!userCart) {
            return sendResponse(res, 400, false, "Cart is empty");
        }

        // 2. Get cart items
        const items = await db
            .select({
                productId: cartItems.productId,
                quantity: cartItems.quantity,
                price: products.price,
            })
            .from(cartItems)
            .where(eq(cartItems.cartId, userCart.id))
            .innerJoin(products, eq(cartItems.productId, products.id));

        if (items.length === 0) {
            return sendResponse(res, 400, false, "Cart is empty");
        }

        // 3. Calculate total price
        const totalPrice = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toFixed(2);

        // 4. Create order (Transaction)
        const newOrder = await db.transaction(async (tx) => {
            const [order] = await tx
                .insert(orders)
                .values({
                    userId: user.id,
                    totalPrice,
                    status: "PENDING",
                })
                .returning();

            const orderItemsData = items.map((item) => ({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.price,
            }));

            await tx.insert(orderItems).values(orderItemsData);

            // 5. Clear cart
            await tx.delete(cartItems).where(eq(cartItems.cartId, userCart.id));

            return order;
        });

        sendResponse(res, 201, true, "Order created successfully", newOrder);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const userOrders = await db
            .select()
            .from(orders)
            .where(eq(orders.userId, user.id))
            .orderBy(desc(orders.createdAt));

        sendResponse(res, 200, true, "Orders retrieved successfully", userOrders);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = (req as any).user;

        const [order] = await db.select().from(orders).where(eq(orders.id, id as string));

        if (!order) {
            return sendResponse(res, 404, false, "Order not found");
        }

        // Check ownership or admin
        if (order.userId !== user.id && user.role !== "ADMIN") {
            return sendResponse(res, 403, false, "Forbidden");
        }

        const items = await db
            .select({
                id: orderItems.id,
                quantity: orderItems.quantity,
                priceAtPurchase: orderItems.priceAtPurchase,
                product: products,
            })
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id))
            .innerJoin(products, eq(orderItems.productId, products.id));

        sendResponse(res, 200, true, "Order details retrieved", { ...order, items });
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Should be validated with enum if possible

        const [updatedOrder] = await db
            .update(orders)
            .set({ status })
            .where(eq(orders.id, id as string))
            .returning();

        if (!updatedOrder) {
            return sendResponse(res, 404, false, "Order not found");
        }

        sendResponse(res, 200, true, "Order status updated", updatedOrder);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};
