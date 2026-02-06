import { Link } from "react-router";
import { useOrders } from "../../lib/hooks/useOrders";
import { Package, Clock, ChevronRight, ShoppingBag } from "lucide-react";

export default function OrderHistory() {
    const { data: orders = [], isLoading } = useOrders();

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 text-foreground">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border rounded-xl bg-card">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                    <p className="text-muted-foreground mb-8">When you place an order, it will appear here.</p>
                    <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-all">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            to={`/orders/${order.id}`}
                            className="group block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                                        <Package className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-mono font-bold">#{order.id.slice(-8).toUpperCase()}</p>
                                        <p className="text-xs text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-8">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                                        <p className="text-lg font-bold font-mono text-foreground">${order.totalPrice}</p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                                order.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                                    order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                        "bg-blue-100 text-blue-700"
                                            }`}>
                                            {order.status}
                                        </span>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
