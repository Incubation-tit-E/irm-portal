import { getUserStartup } from "@/firebaseFunctions/utils";
import { create } from "zustand";

type User = {
  uid: string;
  email?: string | null;
  startupName?: string | null;
} | null;

type AuthState = {
  user: User;
  loading: boolean;
  setUser: (u: { uid: string; email?: string | null }) => Promise<void>;
  clearUser: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: async (u) => {
    try {
      // fetch startup name from Firestore
      const startupName = await getUserStartup(u.uid);

      set({
        user: {
          uid: u.uid,
          email: u.email,
          startupName,
        },
        loading: false,
      });
    } catch (err) {
      console.error("Error setting user with startup:", err);
      set({ user: { ...u, startupName: null }, loading: false });
    }
  },

  clearUser: () => set({ user: null, loading: false }),
}));
