import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  const login = (token) => {
    setAuth({
      isAuthenticated: true,
      token,
    });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
    });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
