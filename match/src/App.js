import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import DashboardLayout from './components/dashboard/DashboardLayout';
import { ProtectedRoute, AuthProvider } from "./AuthProvider";
import AuthWrapper from './AuthWrapper';
import Loading from './NewComp/Loading';
import Match from "./components/dashboard/Match";
import Likesoo from './components/dashboard/Likesoo';
import Matchesoo from './components/dashboard/Matchesoo';
import Chatsoo from './components/dashboard/Chatsoo';
import Profilee from './components/dashboard/Profilee';





export default function App(){
  const [bool, setBool] = useState(false);


  useEffect(() => {
    const preventRefresh = (e) => {
      if (e.touches.length === 1) e.preventDefault();
    };

    document.addEventListener('touchmove', preventRefresh, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventRefresh);
    };
  }, []);


  return (
    
    <AuthProvider>
    <Router>
      <AuthWrapper setBool={setBool}/>
      {bool ? (
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/profile-setup" element={<ProtectedRoute><StepForm/></ProtectedRoute>} />
        <Route path="/app" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
            <Route path="likes" element={<Likesoo />} />
            <Route path="matches" element={<Matchesoo />} />
            <Route path="home" element={<Match />} />
            <Route path="chats" element={<Chatsoo />} />
            <Route path="profile" element={<Profilee />} />
        </Route>
      </Routes>

      ):(
      <Loading/>
      )}

    </Router>
  </AuthProvider>

  );
}
