"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setAuthToken } from "./api";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use localStorage for a simple auth solution
const AUTH_STORAGE_KEY = "summit_point_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        if (typeof window !== "undefined") {
          const authData = localStorage.getItem(AUTH_STORAGE_KEY);
          if (authData) {
            const parsedData = JSON.parse(authData);
            setUser(parsedData.user);
          }
        }
      } catch (err) {
        console.error("Error loading auth state:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async (name: string, email: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would validate credentials with an API
      // For now, we'll just accept any credentials

      // Create user object
      const userData = { name, email };
      setUser(userData);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            user: userData,
            timestamp: Date.now(),
          })
        );
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Authentication failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    // Redirect to login
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
