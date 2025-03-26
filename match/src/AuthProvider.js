import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';
import Loading from './components/dashboard/Loading'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [lpuselfprofile, setLpuSelfProfile] = useState({});
  const [selfprofile, setSelfProfile] = useState({})
  const [bool, setBool] = useState(false);
  const [bool2, setBool2] = useState(false)
  const [likesNoti, setLikesNoti] = useState([])
  const [matchesNoti, setMatchesNoti] = useState([])
  const [loading , setLoading] = useState(true)
  
  

  console.log(`AuthProvider --selfprofile-->${selfprofile}\n lpuselfprofile--->${lpuselfprofile}`)
  

  useEffect(() => {

    if (bool) {
      setLoading(true)
    axios
      .get("https://api.uni-match.in/profilecomp", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setLpuSelfProfile(response.data.lpuselfprofile);
        setSelfProfile(response.data.selfprofile);
      })
      .catch((error) => {
        console.error("Error", error);

        if (error.response?.status === 401) {
          axios
            .post(
              "https://api.uni-match.in/refresh",
              {},
              {
                withCredentials: true,
                headers: {
                  "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
                },
              },
            )

            .then((response) => {
              const csrfTokenAccess = response.headers["x-csrf-token-access"];
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

              axios
                .get("https://api.uni-match.in/profilecomp", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data);
                  setLpuSelfProfile(response.data.lpuselfprofile);
                  setSelfProfile(response.data.selfprofile);
                })
                .catch((retryError) =>
                  console.error("Failed after refresh:", retryError),
                );
            })
            .catch(() =>
              console.error("Session expired, please log in again."),
            );
        }
      })
      .finally(()=>{
        setLoading(false)
      })

    }
  }, [bool]);


  function login(a){
    setBool(a);
  };


  return (
    <AuthContext.Provider value={{ bool, loading, bool2, setBool2, login, likesNoti, setLikesNoti, matchesNoti, setMatchesNoti, lpuselfprofile, selfprofile, setLpuSelfProfile, setSelfProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
  const { bool, loading } = useAuth();
  if (loading){
    return <Loading/>
  }
  return bool ? children : <Navigate to="/" />;
};

export const ProtectedRoute2 = ({ children }) => {
  const { bool2, loading } = useAuth();
  if (loading){
    return <Loading/>
  }
  return bool2 ? children : <Navigate to="/" />;
};
