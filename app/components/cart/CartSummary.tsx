import { Link } from "react-router";

interface CartSummaryProps {
    subtotal: number;
    shipping?: number;
}

export const CartSummary = ({ subtotal, shipping = 0 }: CartSummaryProps) => {
    const tax = subtotal * 0.1; // Example 10% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-mono text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-mono text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Estimated Tax</span>
                    <span className="font-mono text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-4 flex items-center justify-between text-base font-bold text-foreground">
                    <span>Total</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                </div>
            </div>

            <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
};
