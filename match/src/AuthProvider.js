import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [bool, setBool] = useState(() => {
    return localStorage.getItem("bool") ? true : false;
  });

  useEffect(() => {
    if (bool) {
      localStorage.setItem("bool", 'uni-match');
    } else {
      localStorage.removeItem('bool')
    }
  }, [bool]);

  const login = (a) => {
    setBool(a);
  };

  const logout = () => {
    setBool(false);
  };

  return (
    <AuthContext.Provider value={{ bool, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};



export const ProtectedRoute = ({ children }) => {
  const { bool } = useAuth();
  return bool ? children : <Navigate to="/" />;
};



