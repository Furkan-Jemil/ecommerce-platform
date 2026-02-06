import { useNavigate, Link } from "react-router";
import { useCart } from "../lib/hooks/useCart";
import { useAuth } from "../lib/hooks/useAuth";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";

export default function Cart() {
    const { user } = useAuth();
    const { items: serverItems, isLoading, updateItem, removeItem } = useCart();
    const { items: localItems, removeItem: removeLocal, updateQuantity: updateLocal } = useCartStore();

    // Choose source based on auth status
    const items = user
        ? serverItems.map((si) => ({
            productId: si.productId,
            quantity: si.quantity,
            name: si.product.name,
            price: si.product.price,
            imageUrl: si.product.imageUrl || undefined,
        }))
        : localItems;


    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    const handleUpdate = async (productId: string, quantity: number) => {
        if (user) {
            await updateItem({ productId, quantity });
        } else {
            updateLocal(productId, quantity);
        }
    };

    const handleRemove = async (productId: string) => {
        if (user) {
            await removeItem(productId);
        } else {
            removeLocal(productId);
        }
    };

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
                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border rounded-xl bg-card">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-all">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="border rounded-xl bg-card overflow-hidden">
                            <div className="p-6">
                                {items.map((item) => (
                                    <CartItem
                                        key={item.productId}
                                        item={item}
                                        onUpdate={handleUpdate}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <CartSummary subtotal={subtotal} />
                    </div>
                </div>
            )}
        </div>
    );
}
