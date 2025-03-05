import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Box, Chip } from "@mui/material";
import AboutUs from './profile/AboutUs';
import ProfileHome from './profile/ProfileHome';
import EditProfile from './profile/EditProfile';
import SupportUs from './profile/SupportUs';
import DeleteAccount from "./profile/DeleteAccount";
import axios from 'axios';

const ProfileSection = ({ profile , lpuselfprofile, setLpuSelfProfile, setSelfProfile}) => {
  const [bool, setBool] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.uni-match.in/profilecomp", {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") }})
      .then((response) => {
        console.log(response.data)
        setLpuSelfProfile(response.data.lpuselfprofile)
        setSelfProfile(response.data.selfprofile);
      })
      .catch((error) => {
        console.error("Error", error);

        if (error.response?.status === 401) {

          axios.post("https://api.uni-match.in/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh") }} )

            .then((response) => {

              const csrfTokenAccess = response.headers["x-csrf-token-access"]
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess)

                axios.get("https://api.uni-match.in/profilecomp", { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") } })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data)
                  setLpuSelfProfile(response.data.lpuselfprofile)
                  setSelfProfile(response.data.selfprofile);
                })
                .catch((retryError) => console.error("Failed after refresh:", retryError));
            })
            .catch(() => console.error("Session expired, please log in again."));
        }

      });
  }, []);



  const handleOptionClick = (option) => {
  
   if (option === "Edit Profile") {
      setBool(1);
    } else if (option === "About Us") {
      setBool(2);
    } else if(option == 'Support Us'){
      setBool(3);
    } else if(option == 'Delete Account'){
      setBool(4);
    }
  };

  return (
    <>
    {bool === 0 && <ProfileHome handleOptionClick={handleOptionClick} profile={profile} lpuselfprofile={lpuselfprofile} />}
    {bool === 1 && <EditProfile setBool={setBool}/>}
    {bool === 2 && <AboutUs setBool={setBool}/>}
    {bool === 3 && <SupportUs setBool={setBool}/>}
    {bool === 4 && <DeleteAccount setBool={setBool} profile={profile} />}
  </>
  );
};

export default ProfileSection;
