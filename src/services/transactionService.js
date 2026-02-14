import api from "./api";

// Create
export const createTransaction = async (payload) => {
  const res = await api.post("/transactions", payload);
  return res.data;
};

// Update
export const updateTransaction = async (id, payload) => {
  const res = await api.put(`/transactions/${id}`, payload);
  return res.data;
};

// Delete
export const deleteTransaction = async (id) => {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
};

// Get by year/month/day
export const getTransactions = async (params) => {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`/transactions/filter?${query}`);
  return res.data;
};
