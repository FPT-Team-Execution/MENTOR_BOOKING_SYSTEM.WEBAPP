import { createContext, ReactNode, useContext, useState } from "react";
import { login, logout } from "../services/authService";
import axiosInstance from "../utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import paths from "../routes/path";

interface AuthContextType {
  isAuthenticated: boolean;
  jwtToken: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });

      const { jwtToken } = response.data.responseModel;

      //TODO: handle to zustand instead of local storage.
      setJwtToken(jwtToken.accessToken); // Save the access token
      localStorage.setItem("accessToken", jwtToken.accessToken);
      localStorage.setItem("refreshToken", jwtToken.refreshToken);

      navigate(paths.dashboard); // Navigate to the dashboard or other protected route
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const isAuthenticated = Boolean(jwtToken);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, jwtToken, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
