import axios from "axios";

// Prefer explicit env var; fallback to sensible defaults
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
  withCredentials: true,
});
