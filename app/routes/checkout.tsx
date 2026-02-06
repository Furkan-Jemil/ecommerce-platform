import { useNavigate, Link } from "react-router";
import { useCart } from "../lib/hooks/useCart";
import { useAuth } from "../lib/hooks/useAuth";
import { useCreateOrder } from "../lib/hooks/useOrders";
import { CartItem } from "../components/cart/CartItem";
import { ShieldCheck, Truck, CreditCard, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { items, isLoading: cartLoading } = useCart();
    const { mutateAsync: placeOrder, isPending: isPlacingOrder } = useCreateOrder();
    const [error, setError] = useState<string | null>(null);

    const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handlePlaceOrder = async () => {
        try {
            setError(null);
            const order = await placeOrder();
            navigate(`/orders/confirmation/${order.id}`);
        } catch (err: any) {
            setError(err.message || "Failed to place order. Please try again.");
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Please login to continue to checkout</h1>
                <Link to="/auth/login" className="mt-4 text-primary hover:underline">Go to Login</Link>
            </div>
        );
    }

    if (cartLoading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <Link to="/products" className="mt-4 text-primary hover:underline">Go Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 text-foreground">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Info Placeholder */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <Truck className="mr-2 h-5 w-5 text-primary" /> Shipping Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-md border bg-muted/30">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <p className="text-sm text-muted-foreground mt-2 italic">Standard Shipping (3-5 business days)</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info Placeholder */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-primary" /> Payment Method
                        </h2>
                        <div className="p-4 rounded-md border border-primary/20 bg-primary/5 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-[10px] font-bold">CARD</div>
                                <span className="text-sm font-medium">Cash on Delivery (Demo Mode)</span>
                            </div>
                            <div className="h-4 w-4 rounded-full border-4 border-primary"></div>
                        </div>
                    </div>

                    {/* Review Items */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Review Items</h2>
                        <div className="divide-y">
                            {items.map((item) => (
                                <div key={item.id} className="flex py-4 space-x-4">
                                    <img src={item.product.imageUrl || "/placeholder-product.png"} className="h-16 w-16 rounded object-cover border" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium">{item.product.name}</h4>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-mono font-bold">${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-lg">
                        <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                        {error && (
                            <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Items Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span className="text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            disabled={isPlacingOrder}
                            onClick={handlePlaceOrder}
                            className="mt-8 w-full rounded-lg bg-primary py-4 text-sm font-bold text-primary-foreground shadow-xl transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                        >
                            {isPlacingOrder ? "Placing Order..." : "Place Order"}
                        </button>

                        <p className="mt-4 flex items-center justify-center text-xs text-muted-foreground">
                            <ShieldCheck className="mr-1 h-3 w-3" /> Secure checkout powered by Antigravity
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
