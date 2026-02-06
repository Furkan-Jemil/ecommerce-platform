import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function ErrorBoundary() {
    const error = useRouteError();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="rounded-full bg-destructive/10 p-6 mb-6">
                <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight mb-2">
                {isRouteErrorResponse(error) ? `${error.status} Error` : "Something went wrong"}
            </h1>

            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {isRouteErrorResponse(error)
                    ? error.data?.message || "The page you looking for doesn't exist or has been moved."
                    : "An unexpected error occurred. Please try refreshing the page or contact support if the problem persists."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center px-6 py-3 rounded-lg border border-border font-bold hover:bg-muted transition-all"
                >
                    <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                </button>
                <Link
                    to="/"
                    className="flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    <Home className="mr-2 h-4 w-4" /> Back to Home
                </Link>
            </div>

            {process.env.NODE_ENV === "development" && !isRouteErrorResponse(error) && (
                <div className="mt-12 p-4 rounded-lg bg-zinc-900 text-zinc-400 text-left overflow-auto max-w-3xl font-mono text-xs">
                    <pre>{(error as Error).stack}</pre>
                </div>
            )}
        </div>
    );
}
