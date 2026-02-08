import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUp } from "../../lib/api/auth";
import { useState } from "react";
import { Mail, Lock, UserPlus, ArrowRight, AlertCircle, Loader2, User } from "lucide-react";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error: signUpError } = await signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            });

            if (signUpError) {
                setError(signUpError.message || "Registration failed");
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
                            <UserPlus className="h-6 w-6" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Join our community and start shopping
                        </p>
                    </div>

                    <div className="px-8 pb-10">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {error && (
                                <div className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-sm font-semibold text-foreground pl-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        {...register("name")}
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1 ml-1">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-sm font-semibold text-foreground pl-1">
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
                                        placeholder="name@example.com"
                                        className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1 ml-1">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="text-sm font-semibold text-foreground pl-1">
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
                                            placeholder="••••••••"
                                            className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1 ml-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground pl-1">
                                        Verify
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            {...register("confirmPassword")}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            className="block w-full rounded-xl border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60"
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1 ml-1">
                                            <AlertCircle className="h-3.5 w-3.5" />
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link to="/auth/login" className="font-bold text-primary hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
