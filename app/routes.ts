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
    ]),
] satisfies RouteConfig;

