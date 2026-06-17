import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://node-backend-gules-two.vercel.app/api";

const http = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const auth = useAuthStore();
      auth.logout();
    }
    return Promise.reject(error);
  },
);

export default http;
