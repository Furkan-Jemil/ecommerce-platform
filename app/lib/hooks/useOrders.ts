import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchOrderById, createOrder } from "../api/orders";
import { useAuth } from "./useAuth";

export const useOrders = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        enabled: !!user,
    });
};

export const useOrder = (id: string) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => fetchOrderById(id),
        enabled: !!id,
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};
