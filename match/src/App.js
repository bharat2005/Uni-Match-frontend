import React, { useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Done from './components/stepform/Done';
import Login from "./components/login/Login";
import StepForm from "./components/stepform/StepForm";
import { ProtectedRoute, AuthProvider } from "./AuthProvider";
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

// Install Page Component
const InstallPage = ({ promptInstall }) => (
  <div className="install-screen">
    <h2>Please install our app to access features</h2>
    <p>On mobile: Tap "Add to Home Screen".</p>
    <p>On desktop: Click the install icon in the address bar.</p>
    <button onClick={promptInstall}>Install App</button>
  </div>
);

// Main App Component
export default function App() {
  const [bool, setBool] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Detect if running as PWA
  useEffect(() => {
    const checkPWA = () => {
      setIsPWA(
        window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone
      );
    };
    checkPWA();

    window.addEventListener("resize", checkPWA);
    return () => window.removeEventListener("resize", checkPWA);
  }, []);

  // Capture beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  // Handle Install Prompt
  const promptInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the app");
          setIsPWA(true);
        }
      });
    }
  };

  // Restrict access if not installed as PWA
  if (!isPWA) {
    return <InstallPage promptInstall={promptInstall} />;
  }

  return (
    <AuthProvider>
      <Router>
        <AuthWrapper setBool={setBool} />
        {bool ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/profile-setup"
              element={<ProtectedRoute><StepForm /></ProtectedRoute>}
            />
            <Route path="/done" element={<ProtectedRoute><Done /></ProtectedRoute>} />
            <Route path="/app" element={<ProtectedRoute><Home /></ProtectedRoute>} >
              <Route path="likes" element={<Likesoo />} >
                <Route path="info" element={<Drawer2 />} />
              </Route>
              <Route path="matches" element={<Matchesoo />} >
                <Route path=":info" element={<Drawer2 />} />
              </Route>
              <Route path='home' element={<Match />} >
                <Route path='info' element={<Drawer2 />} />
              </Route>
              <Route path="chats" element={<Chatsoo />} >
                <Route path="info" element={<Drawer2 />} />
              </Route>
              <Route path=":chatId" element={<Chatoo />} />
              <Route path="profile" element={<Profilee />} >
                <Route path="edit" element={<Edit />} />
                <Route path="about" element={<About />} />
                <Route path="support" element={<Support />} />
                <Route path="delete" element={<DeleteProfile />} />
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
