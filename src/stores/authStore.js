import { defineStore } from "pinia";

const TOKEN_KEY = "superAdminToken";
const USER_KEY = "superAdminUser";

const readUser = () => {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const useAuthStore = defineStore("superAdminAuth", {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY) || null,
    user: readUser(),
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    login(data) {
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});
