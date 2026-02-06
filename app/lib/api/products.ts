import { apiClient } from "./client";

export interface Product {
    id: string;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    imageUrl: string | null;
    category: string | null;
    createdAt: string;
    updatedAt: string;
}

export const fetchProducts = async (params?: { category?: string; search?: string }) => {
    const response = await apiClient.get<any, { data: Product[] }>("/products", { params });
    return response.data;
};

export const fetchProductById = async (id: string) => {
    const response = await apiClient.get<any, { data: Product }>(`/products/${id}`);
    return response.data;
};
