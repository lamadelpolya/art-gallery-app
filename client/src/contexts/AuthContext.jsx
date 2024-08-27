import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = auth.token;
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5005/api/auth/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAuth({
            isAuthenticated: true,
            user: response.data,
            token,
          });
        } catch (error) {
          setAuth({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, [auth.token]);

  const login = (userData, token) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      token,
    });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
