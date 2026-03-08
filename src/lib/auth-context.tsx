import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "facilitator" | "gimble_admin";

export interface AppUser {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization?: string;
}

const USERS: Record<string, { password: string; user: AppUser }> = {
  "admin@gimble.io": {
    password: "gimble2024",
    user: {
      name: "Adaeze Okonkwo",
      email: "admin@gimble.io",
      role: "facilitator",
      avatar: "AO",
      organization: "Acme Corp",
    },
  },
  "super@gimble.io": {
    password: "gimble2024",
    user: {
      name: "Gimble Admin",
      email: "super@gimble.io",
      role: "gimble_admin",
      avatar: "GA",
    },
  },
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: AppUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => {
    const stored = sessionStorage.getItem("gimble_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    const entry = USERS[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      sessionStorage.setItem("gimble_user", JSON.stringify(entry.user));
      sessionStorage.setItem("gimble_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("gimble_user");
    sessionStorage.removeItem("gimble_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
