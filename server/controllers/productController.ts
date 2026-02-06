import type { Request, Response } from "express";
import { db } from "../../db";
import { products } from "../../db/schema";
import { sendResponse } from "../utils/response";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    stock: z.number().int().min(0),
    imageUrl: z.string().url().optional().or(z.literal("")),
    category: z.string().optional(),
});

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
        sendResponse(res, 200, true, "Products retrieved successfully", allProducts);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [product] = await db.select().from(products).where(eq(products.id, id));

        if (!product) {
            return sendResponse(res, 404, false, "Product not found");
        }

        sendResponse(res, 200, true, "Product retrieved successfully", product);
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const validatedData = productSchema.parse(req.body);
        const [newProduct] = await db.insert(products).values(validatedData).returning();
        sendResponse(res, 201, true, "Product created successfully", newProduct);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return sendResponse(res, 400, false, "Validation failed", error.issues);
        }
        sendResponse(res, 500, false, error.message);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const validatedData = productSchema.partial().parse(req.body);

        const [updatedProduct] = await db
            .update(products)
            .set({ ...validatedData, updatedAt: new Date() })
            .where(eq(products.id, id))
            .returning();

        if (!updatedProduct) {
            return sendResponse(res, 404, false, "Product not found");
        }

        sendResponse(res, 200, true, "Product updated successfully", updatedProduct);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return sendResponse(res, 400, false, "Validation failed", error.issues);
        }
        sendResponse(res, 500, false, error.message);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [deletedProduct] = await db.delete(products).where(eq(products.id, id)).returning();

        if (!deletedProduct) {
            return sendResponse(res, 404, false, "Product not found");
        }

        sendResponse(res, 200, true, "Product deleted successfully");
    } catch (error: any) {
        sendResponse(res, 500, false, error.message);
    }
};
