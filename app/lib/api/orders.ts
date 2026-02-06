import { apiClient } from "./client";

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    priceAtPurchase: string;
    product: {
        name: string;
        imageUrl: string | null;
    };
}

export interface Order {
    id: string;
    userId: string;
    totalPrice: string;
    status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    createdAt: string;
    items?: OrderItem[];
}

export const fetchOrders = async () => {
    const response = await apiClient.get<any, { data: Order[] }>("/orders");
    return response.data;
};

export const fetchOrderById = async (id: string) => {
    const response = await apiClient.get<any, { data: Order }>(`/orders/${id}`);
    return response.data;
};

export const createOrder = async () => {
    const response = await apiClient.post<any, { data: Order }>("/orders");
    return response.data;
};
