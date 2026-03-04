import { createContext, useContext, useState, ReactNode } from "react";
import { mockUser } from "./mock-data";

interface AuthContextType {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("gimble_auth") === "true";
  });

  const login = (email: string, password: string) => {
    if (email === "admin@gimble.io" && password === "gimble2024") {
      setIsAuthenticated(true);
      sessionStorage.setItem("gimble_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gimble_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: isAuthenticated ? mockUser : null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
