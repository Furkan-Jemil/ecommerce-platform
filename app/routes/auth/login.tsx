import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "../../lib/api/auth";
import { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error: signInError } = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (signInError) {
                setError(signInError.message || "Invalid email or password");
            } else {
                navigate("/");
            }
        } catch (err: any) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-slate-50/50 p-4 dark:from-slate-900 dark:via-gray-950 dark:to-indigo-950/30">
            <div className="relative w-full max-w-md">
                {/* Background decorative elements */}
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80">
                    <div className="px-8 pt-10 pb-6 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <LogIn className="h-6 w-6" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Please enter your details to sign in
                        </p>
                    </div>

                    <div className="px-8 pb-10">
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {error && (
                                <div className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="name@example.com"
                                        className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2.5 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1.5">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold text-foreground">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        {...register("password")}
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2.5 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1.5">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link to="/auth/register" className="font-bold text-primary hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
