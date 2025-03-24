import React, { useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Done from "./components/stepform/Done";
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
import Edit from "./components/dashboard/Edit";
import About from "./components/dashboard/About";
import Drawer2 from "./components/dashboard/Drawer2";
import Support from "./components/dashboard/Support";
import DeleteProfile from "./components/dashboard/DeleteProfile";
//import InstallPage from "./components/InstallPage"; // New Install Page

export default function App() {
  const [bool, setBool] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Detect if running as PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;
    setIsPWA(isStandalone);

    // Redirect to install page only once (avoid infinite reload)
    if (!isStandalone && window.location.pathname !== "/install") {
      navigate("/install");
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Handle screen height resizing
    const resizeHandler = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [navigate]);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User installed the app");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <AuthProvider>
      <Router>
        <AuthWrapper setBool={setBool} />
        <Routes>
          {!isPWA ? (
            <Route path="*" element={<InstallPage onInstall={handleInstall} />} />
          ) : bool ? (
            <>
              <Route path="/" element={<Login />} />
              <Route
                path="/profile-setup"
                element={
                  <ProtectedRoute>
                    <StepForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/done"
                element={
                  <ProtectedRoute>
                    <Done />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              >
                <Route path="likes" element={<Likesoo />}>
                  <Route path="info" element={<Drawer2 />} />
                </Route>
                <Route path="matches" element={<Matchesoo />}>
                  <Route path=":info" element={<Drawer2 />} />
                </Route>
                <Route path="home" element={<Match />}>
                  <Route path="info" element={<Drawer2 />} />
                </Route>
                <Route path="chats" element={<Chatsoo />}>
                  <Route path="info" element={<Drawer2 />} />
                </Route>
                <Route path=":chatId" element={<Chatoo />} />
                <Route path="profile" element={<Profilee />}>
                  <Route path="edit" element={<Edit />} />
                  <Route path="about" element={<About />} />
                  <Route path="support" element={<Support />} />
                  <Route path="delete" element={<DeleteProfile />} />
                </Route>
              </Route>
            </>
          ) : (
            <Route path="*" element={<Loading />} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}





const InstallPage = ({ onInstall }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>This App Must Be Installed</h1>
      <p>To use this app, please install it on your device.</p>
      <button onClick={onInstall} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Install App
      </button>
    </div>
  );
};