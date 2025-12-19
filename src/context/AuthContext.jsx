import React, { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("sms-user");
    return cached ? JSON.parse(cached) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("sms-token") || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("sms-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sms-user");
    }
    if (token) {
      localStorage.setItem("sms-token", token);
    } else {
      localStorage.removeItem("sms-token");
    }
  }, [user]);
  useEffect(() => {
    if (token) {
      localStorage.setItem("sms-token", token);
    } else {
      localStorage.removeItem("sms-token");
    }
  }, [token]);

  const login = async ({ email, password, role }) => {
    setIsLoading(true);
    try {
      const { token: jwt, user: payload } = await loginApi(email, password);
      setUser(payload);
      setToken(jwt);
      setIsLoading(false);
      return payload;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: Boolean(user)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
