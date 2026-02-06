import { Link, Outlet, useLocation } from "react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart3, ArrowLeft } from "lucide-react";

export default function AdminLayout() {
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ];

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card hidden md:block">
                <div className="p-6">
                    <Link to="/" className="flex items-center space-x-2 text-primary">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="font-bold">Back to Site</span>
                    </Link>
                    <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground">Admin Portal</h2>
                </div>
                <nav className="mt-4 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
