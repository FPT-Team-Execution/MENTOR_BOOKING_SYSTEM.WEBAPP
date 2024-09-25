import { createContext, useContext, useState } from "react";
import { login, logout } from "@/services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const handleLogin = async (username: string, password: string) => {
    try {
      await login({ username, password });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
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
