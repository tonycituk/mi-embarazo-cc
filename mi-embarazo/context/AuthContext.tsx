"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "@/src/services/loginService";
import { UserModel } from "@/src/models/UserModel";

interface AuthContextProps {
  user: UserModel | null; // User data
  accessToken: string | null; // Access token
  login: (email: string, password: string) => Promise<void>; // Login method
  logout: () => void; // Logout method
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  // Load user and token from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
  }, []);

  // Function to handle login
  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginService(email, password);

      const user = new UserModel(
        loginResponse.user_id,
        loginResponse.user_name,
        loginResponse.user_email,
        loginResponse.user_phone,
        loginResponse.role
      );
      const token = loginResponse.access_token;

      localStorage.setItem("accessToken", token);
      setAccessToken(token);

      setUser(user);
      localStorage.setItem("user_info", JSON.stringify(user));

      // Redirect based on role
      const redirectRoute =
        loginResponse.role === "admin"
          ? "/admin/dashboard"
          : "/doctor/dashboard";
      router.push(redirectRoute);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    setAccessToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
