import create from "zustand";

interface IUseStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const useStore = create<IUseStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (auth) => set(() => ({ isAuthenticated: auth })),
}));

export default useStore;
