import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend.onrender.com", // change
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Optional: global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
