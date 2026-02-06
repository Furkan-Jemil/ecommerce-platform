export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`animate-pulse rounded-md bg-muted ${className}`} />
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export const TableRowSkeleton = ({ columns }: { columns: number }) => {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
};
