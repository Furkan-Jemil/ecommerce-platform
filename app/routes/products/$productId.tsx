import { useParams, Link } from "react-router";
import { useProduct } from "../../lib/hooks/useProducts";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useState } from "react";

export default function ProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, error } = useProduct(productId!);
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="flex animate-pulse flex-col lg:flex-row gap-12">
                    <div className="h-96 w-full lg:w-1/2 rounded-lg bg-muted"></div>
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="h-8 w-3/4 rounded bg-muted"></div>
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-10 w-1/4 rounded bg-muted"></div>
                        <div className="h-12 w-full rounded bg-muted"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product || error) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <Link to="/products" className="mt-4 text-primary hover:underline flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 text-foreground">
            <Link to="/products" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Product Image */}
                <div className="w-full lg:w-1/2 overflow-hidden rounded-xl border bg-card">
                    <img
                        src={product.imageUrl || "/placeholder-product.png"}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-2">
                        {product.category && (
                            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
                                {product.category}
                            </span>
                        )}
                        <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
                        <p className="text-3xl font-bold font-mono text-primary">${product.price}</p>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                        {product.description || "No description available for this product."}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                            <select
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity,
                                imageUrl: product.imageUrl || undefined
                            })}
                            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    {/* Features/Trust Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-8">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <Truck className="h-5 w-5 text-primary" />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <RotateCcw className="h-5 w-5 text-primary" />
                            <span>Free Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
