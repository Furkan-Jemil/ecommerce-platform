import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, addToCart, updateCartItem, removeFromCart } from "../api/cart";
import { useAuth } from "./useAuth";

export const useCart = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const cartQuery = useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        enabled: !!user,
    });

    const addMutation = useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            addToCart(productId, quantity),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            updateCartItem(productId, quantity),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    const removeMutation = useMutation({
        mutationFn: (productId: string) => removeFromCart(productId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    });

    return {
        items: cartQuery.data || [],
        isLoading: cartQuery.isLoading,
        addItem: addMutation.mutateAsync,
        updateItem: updateMutation.mutateAsync,
        removeItem: removeMutation.mutateAsync,
    };
};
