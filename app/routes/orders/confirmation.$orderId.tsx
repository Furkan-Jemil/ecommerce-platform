import { useParams, Link } from "react-router";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";

export default function OrderConfirmation() {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div className="container mx-auto px-4 py-20 text-center text-foreground">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
                <CheckCircle className="h-10 w-10" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">Thank you for your purchase. We've received your order.</p>

            <div className="max-w-md mx-auto rounded-xl border bg-card p-6 shadow-sm mb-12">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Order ID</span>
                    <span className="text-sm font-mono font-bold">#{orderId?.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex items-center space-x-3 text-left">
                    <div className="p-3 bg-muted rounded-lg">
                        <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-bold">Preparing Shipment</p>
                        <p className="text-xs text-muted-foreground">Your items will be ready soon.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={`/orders/${orderId}`} className="group flex items-center bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-all">
                    View Order Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/products" className="flex items-center px-8 py-3 rounded-md font-bold text-muted-foreground hover:bg-muted transition-all">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
            </div>
        </div>
    );
}
