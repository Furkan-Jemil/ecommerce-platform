import { useAuth } from "../lib/hooks/useAuth";
import { Link } from "react-router";

export default function Profile() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
                <h1 className="text-2xl font-bold">Please login to view your profile</h1>
                <Link to="/auth/login" className="mt-4 text-primary hover:underline">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg border shadow-sm">
                <h1 className="text-3xl font-bold mb-6 tracking-tight">User Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Account Role</label>
                        <p className="text-lg font-semibold capitalize">{user.role || "User"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
