import { useParams, Link } from "react-router";
import { useOrder } from "../../lib/hooks/useOrders";
import { Package, Truck, CheckCircle, RotateCcw, ArrowLeft, Clock } from "lucide-react";

export default function OrderDetail() {
    const { orderId } = useParams<{ orderId: string }>();
    const { data: order, isLoading } = useOrder(orderId!);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Order not found</h1>
                <Link to="/orders" className="mt-4 text-primary hover:underline">Back to Orders</Link>
            </div>
        );
    }

    const statusSteps = [
        { label: "Pending", icon: Clock, value: "PENDING" },
        { label: "Shipped", icon: Truck, value: "SHIPPED" },
        { label: "Delivered", icon: CheckCircle, value: "DELIVERED" },
    ];

    const currentStep = statusSteps.findIndex(s => s.value === order.status);

    return (
        <div className="container mx-auto px-4 py-8 text-foreground">
            <Link to="/orders" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Order #{order.id.slice(-8).toUpperCase()}</h1>
                    <p className="text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`rounded-full px-4 py-1.5 text-sm font-bold uppercase ${order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                            order.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                    "bg-blue-100 text-blue-700"
                        }`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Status Timeline */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-8">Order Progress</h2>
                        <div className="relative flex justify-between">
                            {/* Connector Line */}
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-muted"></div>
                            <div className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500" style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}></div>

                            {statusSteps.map((step, i) => {
                                const Icon = step.icon;
                                const isActive = i <= currentStep;
                                return (
                                    <div key={step.label} className="relative z-10 flex flex-col items-center">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${isActive ? "bg-primary border-primary text-primary-foreground" : "bg-card border-muted text-muted-foreground"
                                            }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <div className="divide-y">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex py-6 first:pt-0 last:pb-0 gap-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border">
                                        <img src={item.product.imageUrl || "/placeholder-product.png"} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-foreground">{item.product.name}</h4>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-muted-foreground">Price at purchase: ${item.priceAtPurchase}</p>
                                            <p className="font-mono font-bold text-lg">${(Number(item.priceAtPurchase) * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Totals Summary */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-24">
                        <h3 className="text-lg font-bold mb-4">Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Subtotal</span>
                                <span className="font-mono text-foreground">${order.totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground text-xs italic">
                                <span>Tax included</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary font-mono">${order.totalPrice}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button className="flex w-full items-center justify-center space-x-2 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted transition-colors">
                                <Package className="h-4 w-4" />
                                <span>Track Parcel</span>
                            </button>
                            <button className="flex w-full items-center justify-center space-x-2 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted transition-colors">
                                <RotateCcw className="h-4 w-4" />
                                <span>Return Items</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
