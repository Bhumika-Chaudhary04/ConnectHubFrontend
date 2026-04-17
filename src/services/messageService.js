import api from "../lib/api";

export const sendMessageApi = async (payload) => {
  const response = await api.post("/messages", payload);
  return response.data;
};

export const getMessagesByRoom = async (roomId) => {
  const response = await api.get(`/messages?roomId=${roomId}`);
  return response.data;
};