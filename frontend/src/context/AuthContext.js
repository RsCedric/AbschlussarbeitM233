import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (userData, isAdmin = false) => {
    setUser(userData);
    setAdmin(isAdmin);
  };

  const logout = () => {
    setUser(null);
    setAdmin(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 