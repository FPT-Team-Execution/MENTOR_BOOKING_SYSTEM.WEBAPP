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
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<TokenData>();
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('refreshToken')
      if (token) {
        handleRefreshToken(token);
      } else {
        setIsLoading(false);
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleRefreshToken = async (token: string) => {
    try {
      const res = await refreshToken(token);
      if (res?.data.isSuccess) {
        const newJwtToken = res.data.responseModel.newJwtToken;
        setJwtToken(newJwtToken.accessToken);
        localStorage.setItem("refreshToken", newJwtToken.refreshToken);
        setUserInfo(decode(newJwtToken.accessToken));
        setIsAuthenticated(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      navigate("/login");
    } finally {
      setIsLoading(false); // Kết thúc loading sau khi xử lý token
    }
  };


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
      await setUserInfo(decode(jwtToken.accessToken))
      setIsAuthenticated(true)
      navigate(paths.dashboard); // Navigate to the dashboard or other protected route
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false)
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
      value={{ isAuthenticated, jwtToken, userInfo, isLoading, handleLogin, handleLogout }}
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
