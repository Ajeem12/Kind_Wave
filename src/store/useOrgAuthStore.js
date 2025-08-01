import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrgAuthStore = create(
  persist(
    (set, get) => ({
      orgUser: null,
      tokenExpiry: null,
      hasHydrated: false,

      loginOrg: (user, token) => {
        const expiry = Date.now() + 60 * 60 * 1000;
        set({ orgUser: user, token, tokenExpiry: expiry });
      },

      logoutOrg: () => set({ orgUser: null, token: null, tokenExpiry: null }),

      isTokenValid: () => {
        const expiry = get().tokenExpiry;
        return expiry && Date.now() < expiry;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useOrgAuthStore;
