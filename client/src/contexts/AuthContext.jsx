import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (auth.token) {
        try {
          const response = await axios.get('/api/auth/check', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          });
          setAuth((prev) => ({ ...prev, isAuthenticated: true, user: response.data }));
        } catch (error) {
          setAuth({ isAuthenticated: false, user: null, token: null });
          localStorage.removeItem('token');
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
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
