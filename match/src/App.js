import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "./AuthProvider";
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Login/>
  
  );
}
