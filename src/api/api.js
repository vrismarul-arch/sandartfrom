import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // This comes from your .env
  timeout: 10000,                          // 10 seconds
});
