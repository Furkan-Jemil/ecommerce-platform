import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/api/products";
import { fetchOrders } from "../../lib/api/orders";
import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
    const { data: orders = [] } = useQuery({
        queryKey: ["orders-all-admin"], queryFn: async () => {
            // In a real app, we'd have a specific admin endpoint for ALL orders
            // For now, reuse the orders hook if user is admin
            return fetchOrders();
        }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalPrice), 0);
    const totalSales = orders.filter(o => o.status === "DELIVERED").length;

    const stats = [
        { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
        { label: "Active Orders", value: orders.filter(o => o.status === "PENDING").length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Total Products", value: products.length, icon: Package, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Sales Growth", value: "+12.5%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground italic">Welcome back to your administration command center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`rounded-lg ${stat.bg} p-2 ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* Recent Orders Placeholder */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {orders.slice(0, 5).map(order => (
                            <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                <span className="text-sm font-mono">#{order.id.slice(-6)}</span>
                                <span className="text-sm font-bold">${order.totalPrice}</span>
                                <span className="text-xs uppercase bg-muted px-2 py-1 rounded">{order.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Placeholder */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Inventory Alerts</h3>
                    <div className="space-y-4">
                        {products.filter(p => p.stock < 10).map(p => (
                            <div key={p.id} className="flex items-center justify-between border-b pb-2 last:border-0 text-destructive">
                                <span className="text-sm font-medium">{p.name}</span>
                                <span className="text-sm font-bold">Only {p.stock} left</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
