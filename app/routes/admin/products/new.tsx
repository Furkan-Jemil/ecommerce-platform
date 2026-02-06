import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiClient } from "../../../lib/api/client";
import { useState } from "react";
import { Camera, Save, X, Loader2 } from "lucide-react";

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description is too short"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    imageUrl: z.string().url().optional().or(z.literal("")),
    category: z.string().min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProduct() {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: { stock: 0 },
    });

    const imageUrl = watch("imageUrl");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            // 1. Get Auth Parameters from backend
            const { data: authParams } = await apiClient.get("/upload/auth");

            // 2. Upload to ImageKit directly (Client Side)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("publicKey", authParams.publicKey);
            formData.append("signature", authParams.signature);
            formData.append("expire", authParams.expire);
            formData.append("token", authParams.token);
            formData.append("fileName", file.name);
            formData.append("folder", "/products");

            const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.url) {
                setValue("imageUrl", result.url);
            } else {
                throw new Error(result.message || "Upload failed");
            }
        } catch (err: any) {
            setError("Image upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data: ProductFormValues) => {
        try {
            await apiClient.post("/products", data);
            navigate("/admin/products");
        } catch (err: any) {
            setError(err.message || "Failed to create product");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <button onClick={() => navigate(-1)} className="text-sm font-medium hover:underline flex items-center">
                    <X className="mr-1 h-4 w-4" /> Cancel
                </button>
            </div>

            <div className="rounded-xl border bg-card p-8 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded bg-destructive/10 text-destructive text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium">Product Name</label>
                                <input {...register("name")} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
                                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium">Category</label>
                                <select {...register("category")} className="mt-1 w-full rounded-md border bg-background px-3 py-2">
                                    <option value="">Select Category</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Home">Home</option>
                                    <option value="Books">Books</option>
                                    <option value="Beauty">Beauty</option>
                                </select>
                                {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium">Price ($)</label>
                                    <input {...register("price")} placeholder="29.99" className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
                                    {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Stock</label>
                                    <input type="number" {...register("stock", { valueAsNumber: true })} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
                                    {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea {...register("description")} rows={5} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
                                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
                            </div>
                        </div>

                        {/* Image Upload Area */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium">Product Image</label>
                            <div className="relative aspect-square rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/10 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50 group">
                                {imageUrl ? (
                                    <>
                                        <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label className="cursor-pointer bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium">Change Image</label>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        {uploading ? (
                                            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                                        ) : (
                                            <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                                        )}
                                        <p className="mt-2 text-sm text-muted-foreground">Click to upload product image</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                            {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
                            <p className="text-[10px] text-muted-foreground text-center">Supported formats: JPG, PNG, WEBP. Max size: 2MB.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting || uploading}
                            className="flex items-center space-x-2 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow transition-all hover:bg-primary/90 disabled:opacity-50"
                        >
                            {(isSubmitting || uploading) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            <span>Save Product</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
