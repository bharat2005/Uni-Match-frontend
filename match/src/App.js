import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute, AuthProvider } from "./AuthProvider";
import AuthWrapper from './AuthWrapper';





export default function App(){
  const [bool, setBool] = useState(false);


  return (
    
    <AuthProvider>
    <Router>
      <AuthWrapper setBool={setBool}/>
      {bool ? (
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profile-setup" element={<ProtectedRoute><StepForm/></ProtectedRoute>} />
        <Route path="/app" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>

      ):(
      <div>Loading.....</div>
      )}

    </Router>
  </AuthProvider>

  );
}
