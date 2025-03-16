import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import { ProtectedRoute, AuthProvider } from "./AuthProvider";
import AuthWrapper from './AuthWrapper';
import Loading from './components/dashboard/Loading';
import Home from "./components/dashboard/Home";
import Likesoo from './components/dashboard/Likesoo';
import Matchesoo from './components/dashboard/Matchesoo';
import Match from './components/dashboard/Match';
import Profilee from './components/dashboard/Profilee';
import Chatsoo from './components/dashboard/Chatsoo';
import Chatoo from './components/dashboard/Chatoo';



export default function App(){
  const [bool, setBool] = useState(false);


  useEffect(() => {
    // Fix viewport height based on window height
    const resizeHandler = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    // Prevent pull-to-refresh and bounce scrolling
    // const preventScroll = (e) => e.preventDefault();
    // document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('resize', resizeHandler);
     // document.removeEventListener('touchmove', preventScroll);
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

        <Route path="/app" element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route path="likes" element={<Likesoo />} />
            <Route path="matches" element={<Matchesoo />} />
            <Route index element={<Match />} /> 
            <Route path="chats" element={<Chatsoo />}/>
            <Route path=":chatId" element={<Chatoo />} />
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
