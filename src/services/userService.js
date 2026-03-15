import api from "./api";

export const getUserProfile = async (userId) => {
  const res = await api.get(`/user/${userId}`);
  return res.data?.data?.user;
};

export const updateUserProfile = async (userId, payload) => {
  const res = await api.put(`/user/${userId}`, payload);
  return res.data?.data?.user;
};

export const updateNotification = async (userId, payload) => {
  const res = await api.patch(`/user/${userId}/notifications`, payload);
  return res.data;
};

export const changePassword = async (userId, payload) => {
  const res = await api.put(`/user/${userId}/change-password`, payload);
  return res.data;
};
