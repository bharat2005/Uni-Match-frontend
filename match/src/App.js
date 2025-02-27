import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute, AuthProvider } from "./AuthProvider";




export default function App() {

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
