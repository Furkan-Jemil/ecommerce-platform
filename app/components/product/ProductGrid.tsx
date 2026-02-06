import { ProductCard } from "./ProductCard";
import type { Product } from "../../lib/api/products";

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col space-y-4">
                        <div className="h-64 rounded-lg bg-muted"></div>
                        <div className="h-4 w-2/3 rounded bg-muted"></div>
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-6 w-1/4 rounded bg-muted"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
