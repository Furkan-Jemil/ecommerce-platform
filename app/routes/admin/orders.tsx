import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders } from "../../../lib/api/orders";
import { apiClient } from "../../../lib/api/client";
import { ShoppingBag, Search, Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function AdminOrders() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders-admin-all"],
        queryFn: () => fetchOrders()
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            apiClient.put(`/orders/${id}/status`, { status }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders-admin-all"] }),
    });

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                <p className="text-muted-foreground">Monitor and update customer orders.</p>
            </div>

            <div className="flex items-center bg-card p-3 rounded-lg border shadow-sm">
                <Search className="h-5 w-5 text-muted-foreground ml-2" />
                <input
                    type="text"
                    placeholder="Search by Order ID or Status..."
                    className="flex-1 bg-transparent border-0 focus:ring-0 px-3 text-sm font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-foreground">
                    <thead className="bg-muted/50 border-b text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Customer ID</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={6} className="px-6 py-4"><div className="h-8 bg-muted rounded mb-2"></div></td>
                                </tr>
                            ))
                        ) : filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-xs uppercase">#{order.id.slice(-8)}</td>
                                <td className="px-6 py-4 text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-xs font-mono">{order.userId.slice(-6)}</td>
                                <td className="px-6 py-4 font-mono font-bold">${order.totalPrice}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase border-0 focus:ring-2 focus:ring-primary ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                                order.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                                    order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                        "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPED">Shipped</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/orders/${order.id}`} className="p-2 text-muted-foreground hover:text-primary transition-colors inline-block">
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
