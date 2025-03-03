import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute, AuthProvider } from "./AuthProvider";
import { useNavigate } from "react-router-dom";




export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/refresh", {}, { withCredentials: true }) 
    .then(() => {
        console.log("Session restored! Navigating to dashboard...");
        navigate("/dashboard");
      })
      .catch(() => {
        console.log("Session expired, redirecting to login...");
        navigate("/"); 
      });
  }, []);











  return (
    
    <AuthProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profile-setup" element={<ProtectedRoute><StepForm/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
    </Router>

  </AuthProvider>

  );
}
