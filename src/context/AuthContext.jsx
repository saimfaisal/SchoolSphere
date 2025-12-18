import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("sms-user");
    return cached ? JSON.parse(cached) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("sms-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sms-user");
    }
  }, [user]);

  const login = async ({ email, password, role }) => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const friendlyName = email ? email.split("@")[0] : "Guest";
        const payload = {
          id: `${role}-${Date.now()}`,
          name: friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1),
          email,
          role
        };
        setUser(payload);
        setIsLoading(false);
        resolve(payload);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
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
