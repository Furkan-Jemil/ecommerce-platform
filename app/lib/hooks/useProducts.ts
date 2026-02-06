import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/products";

export const useProducts = (params?: { category?: string; search?: string }) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => fetchProducts(params),
    });
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    });
};
