import axiosInstance from "../utils/axios/axiosInstance";
import {
  CONFIRM_EMAIL,
  GOOGLE_SIGNIN,
  LOGIN_URL,
  LOGOUT_URL,
  MENTOR_REGISTER,
  REFRESH_TOKEN,
  STUDENT_REGISTER,
} from "../utils/apiUrl/baseUrl";
import { RefreshTokenData, ResponseModel } from "../types/common.types";

interface LoginData {
  username: string;
  password: string;
}

interface Token {
  email: string;
  token: string;
}

interface StudentData {
  email?: string;
  password?: string;
  fullName?: string;
  gender?: string;
  university?: string;
  majorId?: string;
}

interface MentorData {
  email: string;
  password: string;
  fullName: string;
  avatarUrl: string;
  gender: string;
  industry?: string;
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

export const studentRegister = async (studentData: StudentData) => {
  try {
    const res = await axiosInstance.post(STUDENT_REGISTER, studentData);
    return { res: res, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};

export const mentorRegister = async (mentorData: MentorData) => {
  try {
    const res = await axiosInstance.post(MENTOR_REGISTER, mentorData);
    return { res: res, err: null };
  } catch (error) {
    return { res: null, err: error };
  }
};

export const confirmEmail = async (token: Token) => {
  try {
    const res = await axiosInstance.put(CONFIRM_EMAIL, token);
    return { res: res, error: null };
  } catch (error) {
    return { res: null, err: error };
  }
};

export const loginWithGoogle = async () => {
  try {
    const response = await axiosInstance.get(GOOGLE_SIGNIN);
    return { res: response, error: null };
  } catch (error) {
    return { res: null, error: error };
  }
};

export const refreshToken = async (refreshToken: string) => {
  try {
    const res = await axiosInstance.post<ResponseModel<RefreshTokenData>>( REFRESH_TOKEN, {refreshToken});
    return res
  } catch (error) {
    console.log(error)
  }
}
