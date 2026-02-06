import { useState, useEffect } from "react";
import { useSession, signOut } from "../api/auth";
import { useAuthStore } from "../../store/authStore";

export const useAuth = () => {
    const { data: session, isPending, error } = useSession();
    const { setUser, setSession, user: storeUser } = useAuthStore();

    useEffect(() => {
        if (session) {
            setUser(session.user);
            setSession(session.session);
        } else if (!isPending) {
            setUser(null);
            setSession(null);
        }
    }, [session, isPending, setUser, setSession]);

    return {
        user: storeUser || session?.user,
        session: session?.session,
        isLoading: isPending,
        error,
        logout: async () => {
            await signOut();
            setUser(null);
            setSession(null);
        },
        isAdmin: session?.user?.role === "ADMIN",
    };
};
