import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {

  const [bool, setBool] = useState(!!localStorage.getItem("authToken") );
  const [profile, setProfile] = useState(false)


  function login(token) {
    localStorage.setItem("authToken", token); 
    setBool(true);
  }
  function logout() {
    localStorage.removeItem("authToken");
    setBool(false);
  }

  function profileSetup(){
    localStorage.setItem("profile-setup","true")
    setProfile(true)
  }


  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setBool(true);
    
    }
    if (localStorage.getItem("profile-setup")){
        setProfile(true)

    }
    
  }, []);

  return (
    <AuthContext.Provider value={{ bool, login, logout, profile, profileSetup }}>
      {props.children}
    </AuthContext.Provider>
  );
}
