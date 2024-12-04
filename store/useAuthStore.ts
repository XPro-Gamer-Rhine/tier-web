import { create } from "zustand";
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  loggedUser: null,
  loading: true,
  login: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ isAuthenticated: true, loggedUser: user });
  },
  logout: () => {
    localStorage.clear();
    set({ isAuthenticated: false, loggedUser: null });
  },
  initializeAuth: () => {
    const token = localStorage.getItem("jwtToken");
    const user = localStorage.getItem("user");
    if (token && user) {
      set({
        isAuthenticated: true,
        loggedUser: JSON.parse(user),
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },
}));
