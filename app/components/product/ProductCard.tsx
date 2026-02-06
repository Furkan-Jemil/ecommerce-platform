import { Link } from "react-router";
import type { Product } from "../../lib/api/products";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { getOptimizedImageUrl } from "../../lib/utils/image-optimization";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
            <Link to={`/products/${product.id}`} className="aspect-h-1 aspect-w-1 sm:aspect-none h-64 overflow-hidden">
                <img
                    src={getOptimizedImageUrl(product.imageUrl, { width: 400, height: 400 })}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-foreground">
                    <Link to={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex flex-1 items-end justify-between">
                    <p className="text-lg font-bold text-foreground font-mono">${product.price}</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                imageUrl: product.imageUrl || undefined
                            });
                        }}
                        className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
