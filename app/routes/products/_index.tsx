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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Explore Our Collection</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Discover high-quality products curated just for you. From tech to fashion, find what fits your lifestyle.</p>
                </div>
                <ProductFilters
                    onSearch={setSearch}
                    onCategoryChange={setCategory}
                    currentCategory={category}
                />
            </div>

            <ProductGrid products={products} isLoading={isLoading} />
        </div>
    );
}
