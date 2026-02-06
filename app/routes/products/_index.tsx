import { useState } from "react";
import { useProducts } from "../../lib/hooks/useProducts";
import { ProductGrid } from "../../components/product/ProductGrid";
import { ProductFilters } from "../../components/product/ProductFilters";

export default function ProductListing() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const { data: products = [], isLoading } = useProducts({
        category: category || undefined,
        search: search || undefined
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-8">All Products</h1>
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0 text-foreground">
                <ProductFilters
                    onSearch={setSearch}
                    onCategoryChange={setCategory}
                    currentCategory={category}
                />
                <div className="flex-1">
                    <ProductGrid products={products} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
