import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [lpuselfprofile, setLpuSelfProfile] = useState({});
  const [selfprofile, setSelfProfile] = useState({})
  const [bool, setBool] = useState(() => {
    return localStorage.getItem("bool") ? true : false;
  });
  const [likesNoti, setLikesNoti] = useState([])
  const [matchesNoti, setMatchesNoti] = useState([])

  console.log(selfprofile)

  useEffect(() => {
    if (bool) {
      localStorage.setItem("bool", "uni-match");

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
      });


    } else {
      localStorage.removeItem("bool");
    }
  }, [bool]);

  const login = (a) => {
    setBool(a);
  };

  const logout = () => {
    setBool(false);
  };

  return (
    <AuthContext.Provider value={{ bool, login, logout, likesNoti, setLikesNoti, matchesNoti, setMatchesNoti, lpuselfprofile, selfprofile, setLpuSelfProfile, setSelfProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }) => {
  const { bool } = useAuth();
  return bool ? children : <Navigate to="/" />;
};
