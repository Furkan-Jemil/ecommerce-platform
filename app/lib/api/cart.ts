import { apiClient } from "./client";

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
        name: string;
        price: string;
        imageUrl: string | null;
    };
}

export const fetchCart = async () => {
    const response = await apiClient.get<any, { data: CartItem[] }>("/cart");
    return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
    const response = await apiClient.post("/cart", { productId, quantity });
    return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
    const response = await apiClient.put(`/cart`, { productId, quantity });
    return response.data;
};

export const removeFromCart = async (productId: string) => {
    const response = await apiClient.delete(`/cart/${productId}`);
    return response.data;
};
