import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import InstallPage from "./InstallPage";
import Restrict from './Restrict';
import Done from './components/stepform/Done';
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import { ProtectedRoute, AuthProvider, ProtectedRoute2 } from "./AuthProvider";
import AuthWrapper from "./AuthWrapper";
import Loading from "./components/dashboard/Loading";
import Home from "./components/dashboard/Home";
import Likesoo from "./components/dashboard/Likesoo";
import Matchesoo from "./components/dashboard/Matchesoo";
import Match from "./components/dashboard/Match";
import Profilee from "./components/dashboard/Profilee";
import Chatsoo from "./components/dashboard/Chatsoo";
import Chatoo from "./components/dashboard/Chatoo";
import Edit from './components/dashboard/Edit';
import About from './components/dashboard/About';
import Drawer2 from './components/dashboard/Drawer2';
import Support from './components/dashboard/Support';
import DeleteProfile from './components/dashboard/DeleteProfile';

export default function App() {
  const [bool, setBool] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAllowed, setIsAllowed] = useState(false)


  useEffect(() => {

  if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true)
  } else {
      setIsStandalone(false)
  }

  const checkAccess = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isPortrait = window.innerHeight > window.innerWidth;
    
    setIsAllowed(isMobile || isPortrait);
  };

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setTimeout(()=> {setDeferredPrompt(event)}, 500);
  };

  const resizeHandler = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    resizeHandler();
    checkAccess();

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("resize", checkAccess); 
  

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("resize", checkAccess); 
    };
  }, []);


  if (!isAllowed){
    return <Restrict />
  }

  // if (!isStandalone){
  //   return  <InstallPage deferredPrompt={deferredPrompt} />
  // } 


  return (
    <AuthProvider>

      <Router>
        <AuthWrapper setBool={setBool} />
        {bool ? (
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute2>
                  <StepForm />
                </ProtectedRoute2>
              }
            />
            
            <Route path="/done"
             element={
                <ProtectedRoute2>
                  <Done />
                </ProtectedRoute2>
              }/>
       

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >

              
              <Route path="likes" element={<Likesoo />} >
                  <Route path="info" element={<Drawer2 />}/>
              </Route>



              <Route path="matches" element={<Matchesoo />} >

              <Route path=":info" element={<Drawer2 />}/>

              </Route>

              <Route path='home' element={<Match />} >
                    <Route path='info' element={<Drawer2/>}/>
              </Route>



              <Route path="chats" element={<Chatsoo />} >
                  <Route path="info" element={<Drawer2 />} />
              </Route>



              <Route path=":chatId" element={<Chatoo />} />



              <Route path="profile" element={<Profilee />} >
                    <Route path="edit" element={<Edit/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="support" element={<Support/>}/>
                    <Route path="delete" element={<DeleteProfile/>}/>
              </Route>

            </Route>
          </Routes>
        ) : (
           <Loading />
         )} 
      </Router>
    </AuthProvider>
  );
}



