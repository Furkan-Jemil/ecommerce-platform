import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/register", "routes/auth/register.tsx"),

    // Product Routes
    route("products", "routes/products/_index.tsx"),
    route("products/:productId", "routes/products/$productId.tsx"),
    route("cart", "routes/cart.tsx"),

    // Checkout & Orders
    route("checkout", "routes/checkout.tsx"),

    // Protected Routes
    layout("components/layout/ProtectedRoute.tsx", [
        route("profile", "routes/profile.tsx"),
        route("orders", "routes/orders/_index.tsx"),
        route("orders/:orderId", "routes/orders/$orderId.tsx"),
        route("orders/confirmation/:orderId", "routes/orders/confirmation.$orderId.tsx"),

        // Admin Portal
        layout("routes/admin/layout.tsx", [
            route("admin/dashboard", "routes/admin/dashboard.tsx"),
            route("admin/products", "routes/admin/products/index.tsx"),
            route("admin/products/new", "routes/admin/products/new.tsx"),
            route("admin/orders", "routes/admin/orders.tsx"),
            // Analytics placeholder
            route("admin/analytics", "routes/admin/dashboard.tsx", { id: "admin-analytics" }),
            // Users placeholder
            route("admin/users", "routes/admin/dashboard.tsx", { id: "admin-users" }),
        ]),
    ]),
] satisfies RouteConfig;


