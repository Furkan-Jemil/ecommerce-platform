import { Trash2, Plus, Minus } from "lucide-react";

interface CartItemProps {
    item: {
        productId: string;
        quantity: number;
        name: string;
        price: string;
        imageUrl?: string;
    };
    onUpdate: (productId: string, q: number) => void;
    onRemove: (productId: string) => void;
}

export const CartItem = ({ item, onUpdate, onRemove }: CartItemProps) => {
    return (
        <div className="flex items-center space-x-4 py-6 border-b last:border-0 border-border">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-input">
                <img
                    src={item.imageUrl || "/placeholder-product.png"}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="flex flex-1 flex-col space-y-1">
                <div className="flex justify-between text-base font-medium text-foreground">
                    <h3>{item.name}</h3>
                    <p className="font-mono">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">${item.price} each</p>

                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-input rounded-md">
                        <button
                            onClick={() => onUpdate(item.productId, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-accent text-muted-foreground transition-colors"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button
                            onClick={() => onUpdate(item.productId, item.quantity + 1)}
                            className="p-1 hover:bg-accent text-muted-foreground transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => onRemove(item.productId)}
                        className="flex items-center text-destructive hover:text-destructive/80 transition-colors"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};
