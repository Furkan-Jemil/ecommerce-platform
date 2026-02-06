import { useNavigate, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../../../lib/api/products";
import { apiClient } from "../../../lib/api/client";
import { Plus, Edit2, Trash2, Package, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function AdminProducts() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products-admin"],
        queryFn: () => fetchProducts()
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiClient.delete(`/products/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products-admin"] }),
    });

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteMutation.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
                    <p className="text-muted-foreground">Manage your store's inventory and details.</p>
                </div>
                <Link to="/admin/products/new" className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-primary/90 transition-all">
                    <Plus className="h-5 w-5" />
                    <span>New Product</span>
                </Link>
            </div>

            <div className="flex items-center bg-card p-3 rounded-lg border shadow-sm">
                <Search className="h-5 w-5 text-muted-foreground ml-2" />
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    className="flex-1 bg-transparent border-0 focus:ring-0 px-3 text-sm font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 w-32 bg-muted rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-20 bg-muted rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-12 bg-muted rounded"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 w-12 bg-muted rounded"></div></td>
                                    <td className="px-6 py-4"></td>
                                </tr>
                            ))
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">No products found matching your search.</td>
                            </tr>
                        ) : filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3 text-foreground">
                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded border">
                                            <img src={product.imageUrl || "/placeholder.png"} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-bold">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex rounded-full bg-muted px-2 py-1 text-xs font-semibold">{product.category}</span>
                                </td>
                                <td className="px-6 py-4 font-mono font-bold">${product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`font-medium ${product.stock < 10 ? "text-destructive" : ""}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <Link to={`/products/${product.id}`} target="_blank" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                        {/* Link to="/admin/products/edit/product.id" Placeholder */}
                                        <button className="p-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
