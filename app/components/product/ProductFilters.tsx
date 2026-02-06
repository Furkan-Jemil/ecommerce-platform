import { Search } from "lucide-react";

interface ProductFiltersProps {
    onSearch: (query: string) => void;
    onCategoryChange: (category: string) => void;
    currentCategory: string;
}

const categories = ["All", "Electronics", "Clothing", "Home", "Books", "Beauty"];

export const ProductFilters = ({ onSearch, onCategoryChange, currentCategory }: ProductFiltersProps) => {
    return (
        <div className="flex flex-col space-y-6 lg:w-64">
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:space-y-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category === "All" ? "" : category)}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors lg:w-full lg:text-left ${(currentCategory === "" && category === "All") || currentCategory === category
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
