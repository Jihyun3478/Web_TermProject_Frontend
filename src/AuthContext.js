import React, { createContext, useState, useEffect } from "react";
import { getMemberInfo } from "./api/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchRole(token);
    }
  }, []);

  const fetchRole = async (token) => {
    try {
      const response = await getMemberInfo();
      setRole(response.data.role);
    } catch (error) {
      console.error("Failed to fetch role info", error);
    }
  };

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
    fetchRole(token);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
