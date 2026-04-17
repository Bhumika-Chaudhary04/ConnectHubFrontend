import api from "../lib/api";

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", {
    email: payload.email,
    password: payload.password,
    username: payload.username,
    fullName: payload.fullName,
  });
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const getGoogleLoginUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8087";
  return `${baseUrl}/oauth2/authorization/google`;
};