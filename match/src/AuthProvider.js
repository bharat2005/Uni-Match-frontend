import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(() => {
    return localStorage.getItem("loginStatus") ? JSON.parse(localStorage.getItem("loginStatus")) : null;
  });

  useEffect(() => {
    if (loginStatus) {
      localStorage.setItem("loginStatus", JSON.stringify(loginStatus));
    } else {
      localStorage.removeItem("loginStatus");
    }
  }, [loginStatus]);

  const login = (loginStatus) => {
    setLoginStatus(loginStatus);
  };

  const logout = () => {
    setLoginStatus(null);
  };


  return (
    <AuthContext.Provider value={{ loginStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useAuth();
  return loginStatus ? children : <Navigate to="/" />;
};



