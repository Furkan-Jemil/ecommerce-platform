import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import type { Route } from "./+types/root";

import "./app.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SHOP | Premium E-commerce Experience" },
    { name: "description", content: "Discover state-of-the-art products with our lightning-fast shopping experience. Secure payments, fast shipping, and 24/7 support." },
    { name: "keywords", content: "ecommerce, shopping, tech, fashion, gadgets, premium" },
    { property: "og:title", content: "SHOP | Premium E-commerce" },
    { property: "og:description", content: "Premium shopping experience built with Antigravity." },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

export const links: Route.LinksFunction = () => [

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen font-sans antialiased bg-background text-foreground">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export { default as ErrorBoundary } from "./components/ui/ErrorBoundary";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

