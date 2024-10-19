import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { refreshToken } from "../services/authService";
import axiosInstance from "../utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import paths from "../routes/path";
import { decode } from "../utils/utils";
import { TokenData } from "../types/common.types";

interface AuthContextType {
  isAuthenticated: boolean;
  jwtToken: string | null;
  userInfo: TokenData | undefined;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<TokenData>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('refreshToken')
      if (token) {
        handleRefreshToken(token);
      } else {
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleRefreshToken = async (token: string) => {
    const res = await refreshToken(token)
    if (res) {
      if (res.data.isSuccess) {
        setJwtToken(res.data.responseModel.newJwtToken.accessToken);
        localStorage.setItem("refreshToken", res.data.responseModel.newJwtToken.refreshToken);
        setUserInfo(decode(res.data.responseModel.newJwtToken.accessToken))
        setIsAuthenticated(true);
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    } 
  }


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
      setUserInfo(decode(jwtToken.accessToken))
      setIsAuthenticated(true)
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
    setIsAuthenticated(false)
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, jwtToken, userInfo, handleLogin, handleLogout }}
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
