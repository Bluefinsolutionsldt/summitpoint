"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setAuthToken, authAPI } from "./api";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (name: string, email: string, redirectPath?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use localStorage for a simple auth solution
const AUTH_STORAGE_KEY = "summit_point_auth";

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Helper function to remove cookie
const removeCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

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

  const login = async (name: string, email: string, redirectPath?: string) => {
    setLoading(true);
    setError(null);
    console.log(
      `Login attempt with name: ${name}, email: ${email}, redirectPath: ${redirectPath}`
    );

    try {
      // Get authentication token from API
      console.log("Attempting to get token from API...");
      const token = await authAPI.createToken(name, email);
      console.log(
        "Token received:",
        token ? "Token received successfully" : "No token received"
      );

      // Set the token in API client headers
      setAuthToken(token);
      console.log("Token set in API client headers");

      // Set the token in cookie for middleware access
      setCookie("auth_token", token);
      console.log("Token set in cookie for middleware access");

      // Create user object
      const userData = { name, email };
      setUser(userData);
      console.log("User data set in state:", userData);

      // Save user data to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            user: userData,
            timestamp: Date.now(),
          })
        );
        console.log("User data saved to localStorage");
      }

      // Redirect to specified path or event by default
      console.log(`Redirecting to: ${redirectPath || "/event"}`);
      router.push(redirectPath || "/event");
      console.log("Router.push called");
    } catch (err) {
      console.error("Login error:", err);
      setError("Authentication failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
      console.log("Login process completed");
    }
  };

  const logout = () => {
    setUser(null);

    // Clear the auth token
    setAuthToken("");

    // Remove the auth token cookie
    removeCookie("auth_token");

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
