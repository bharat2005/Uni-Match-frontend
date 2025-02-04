import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StepForm from "./components/StepForm";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "./AuthProvider";
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile-setup" element={<ProtectedRoute><StepForm/></ProtectedRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>

      </Router>
    </AuthProvider>
  );
}
