import type { Route } from "./+types/home";
import { ProductGrid } from "../components/product/ProductGrid";
import { useProducts } from "../lib/hooks/useProducts";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SHOP | Premium E-commerce" },
    { name: "description", content: "Discover our premium collection of products." },
  ];
}

export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
          <p className="text-muted-foreground mt-2">
            Explore our curated selection of high-quality items.
          </p>
        </div>

        <ProductGrid
          products={products || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
