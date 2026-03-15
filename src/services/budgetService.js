import api from "./api";

export const setMonthlyBudget = async (payload) => {
  const res = await api.post("/budget", payload);
  return res.data;
};

export const getMonthlyBudget = async (userId, year, month) => {
  const res = await api.get(`/budget/${userId}/${year}/${month}`);
  return res.data;
};
