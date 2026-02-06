import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/register", "routes/auth/register.tsx"),

    // Product Routes
    route("products", "routes/products/_index.tsx"),
    route("products/:productId", "routes/products/$productId.tsx"),
    route("cart", "routes/cart.tsx"),

    // Protected Routes
    layout("components/layout/ProtectedRoute.tsx", [
        route("profile", "routes/profile.tsx"),
    ]),
] satisfies RouteConfig;
