import { create } from "zustand";

const usePageLoader = create((set) => ({
  isLoading: false,
  showLoader: () => set({ isLoading: true }),
  hideLoader: () => set({ isLoading: false }),
}));

export default usePageLoader;
