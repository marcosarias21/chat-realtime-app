import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types/types.d";

type loginStore = {
  user: User | null;
  getUser: (user: User) => void;
};

export const useAuthStore = create<loginStore>()(
  persist(
    (set, get) => ({
      user: null,
      getUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
