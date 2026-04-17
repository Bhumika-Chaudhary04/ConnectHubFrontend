import api from "../lib/api";

export const getUserRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

export const createRoom = async (payload) => {
  const response = await api.post("/rooms", payload);
  return response.data;
};