import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("token"),
  });
  const [loading, setLoading] = useState(true);  // New state to handle loading

  useEffect(() => {
    const checkAuth = async () => {
      const token = auth.token;
      if (token) {
        try {
          const response = await axios.get("http://localhost:5005/api/auth/users", {
            headers: {
              Authorization: `Bearer ${token}`,  // Ensure correct token is being sent
            },
          });

          // If request succeeds, update the auth state
          setAuth({
            isAuthenticated: true,
            user: response.data,
            token,
          });
        } catch (error) {
          console.error("Failed to fetch user profile:", error.response?.data || error.message);
          setAuth({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem("token");
        }
      }
      setLoading(false);  // Set loading to false after request completes
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
    <AuthContext.Provider value={{ auth, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
