import axios from "axios";

const api = axios.create({
  baseURL: "https://buddybudget-6j2e.onrender.com", // change this
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
