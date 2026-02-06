import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: any | null;
    session: any | null;
    setUser: (user: any | null) => void;
    setSession: (session: any | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            session: null,
            setUser: (user) => set({ user }),
            setSession: (session) => set({ session }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
