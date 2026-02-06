import { Link } from "react-router";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import { useCartStore } from "../../store/cartStore";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const cartItemsCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary">SHOP</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link to="/products" className="transition-colors hover:text-primary">Products</Link>
                    {user && (
                        <Link to="/orders" className="transition-colors hover:text-primary">Orders</Link>
                    )}
                    {user?.role === "ADMIN" && (
                        <Link to="/admin/dashboard" className="transition-colors hover:text-primary">Admin</Link>
                    )}
                </nav>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative transition-colors hover:text-primary">
                        <ShoppingCart className="h-6 w-6" />
                        {cartItemsCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/profile">
                                <User className="h-6 w-6 transition-colors hover:text-primary" />
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="text-sm font-medium transition-colors hover:text-destructive"
                            >
                                <LogOut className="h-6 w-6" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background px-4 py-4 space-y-4">
                    <Link to="/products" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
                    {user && (
                        <Link to="/orders" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                    )}
                    {user?.role === "ADMIN" && (
                        <Link to="/admin/dashboard" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                    )}
                    {!user && (
                        <Link to="/auth/login" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </header>
    );
};
