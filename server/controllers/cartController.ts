import type { Request, Response } from "express";
import { db } from "../../db";
import { carts, cartItems, products } from "../../db/schema";
import { sendResponse } from "../utils/response";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
});

export const getCart = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        // Find or create cart for user
        let [userCart] = await db.select().from(carts).where(eq(carts.userId, user.id));

        if (!userCart) {
            [userCart] = await db.insert(carts).values({ userId: user.id }).returning();
        }

        const items = await db
            .select({
                id: cartItems.id,
                quantity: cartItems.quantity,
                product: products,
            })
            .from(cartItems)
            .where(eq(cartItems.cartId, userCart.id))
            .innerJoin(products, eq(cartItems.productId, products.id));

        sendResponse(res, 200, true, "Cart retrieved successfully", { cartId: userCart.id, items });
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const addItemToCart = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const { productId, quantity } = addToCartSchema.parse(req.body);

        // Find or create cart
        let [userCart] = await db.select().from(carts).where(eq(carts.userId, user.id));
        if (!userCart) {
            [userCart] = await db.insert(carts).values({ userId: user.id }).returning();
        }

        // Check if item already exists
        const [existingItem] = await db
            .select()
            .from(cartItems)
            .where(and(eq(cartItems.cartId, userCart.id), eq(cartItems.productId, productId)));

        if (existingItem) {
            const [updatedItem] = await db
                .update(cartItems)
                .set({ quantity: existingItem.quantity + quantity })
                .where(eq(cartItems.id, existingItem.id))
                .returning();
            return sendResponse(res, 200, true, "Cart item updated", updatedItem);
        }

        const [newItem] = await db
            .insert(cartItems)
            .values({ cartId: userCart.id, productId, quantity })
            .returning();

        sendResponse(res, 201, true, "Item added to cart", newItem);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return sendResponse(res, 400, false, "Validation failed", error.issues);
        }
        sendResponse(res, 500, false, error.message);
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = z.object({ quantity: z.number().int().positive() }).parse(req.body);

        const [updatedItem] = await db
            .update(cartItems)
            .set({ quantity })
            .where(eq(cartItems.id, id))
            .returning();

        if (!updatedItem) {
            return sendResponse(res, 404, false, "Cart item not found");
        }

        sendResponse(res, 200, true, "Cart item updated", updatedItem);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return sendResponse(res, 400, false, "Validation failed", error.issues);
        }
        sendResponse(res, 500, false, error.message);
    }
};

export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [deletedItem] = await db.delete(cartItems).where(eq(cartItems.id, id)).returning();

        if (!deletedItem) {
            return sendResponse(res, 404, false, "Cart item not found");
        }

        sendResponse(res, 200, true, "Item removed from cart");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const [userCart] = await db.select().from(carts).where(eq(carts.userId, user.id));

        if (userCart) {
            await db.delete(cartItems).where(eq(cartItems.cartId, userCart.id));
        }

        sendResponse(res, 200, true, "Cart cleared successfully");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};
