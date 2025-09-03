// File: src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  // IMPORTANT: Replace this with your actual backend URL
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
