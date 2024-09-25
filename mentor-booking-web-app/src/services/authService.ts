import axiosInstance from "../utils/axios/axiosInstance";
import { LOGIN_URL, LOGOUT_URL } from "../utils/apiUrl/baseUrl";

interface LoginData {
  username: string;
  password: string;
}

export const login = async (loginData: LoginData) => {
  const response = await axiosInstance.post(LOGIN_URL, loginData);
  localStorage.setItem("token", response.data.token); // Store JWT token in localStorage
  return response.data;
};

export const logout = async () => {
  await axiosInstance.post(LOGOUT_URL);
  localStorage.removeItem("token"); // Remove JWT token from localStorage
};
