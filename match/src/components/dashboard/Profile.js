import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box, Chip } from "@mui/material";
import AboutUs from './profile/AboutUs';
import ProfileHome from './profile/ProfileHome';
import EditProfile from './profile/EditProfile';
import SupportUs from './profile/SupportUs';
import DeleteAccount from "./profile/DeleteAccount";

const ProfileSection = ({ profile, user_id , lpuselfprofile}) => {
  const [bool, setBool] = useState(0);

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
    {bool === 0 && <ProfileHome handleOptionClick={handleOptionClick} profile={profile} lpuselfprofile={lpuselfprofile} user_id={user_id}/>}
    {bool === 1 && <EditProfile setBool={setBool} profile={profile}/>}
    {bool === 2 && <AboutUs setBool={setBool} profile={profile}/>}
    {bool === 3 && <SupportUs setBool={setBool} profile={profile}/>}
    {bool === 4 && <DeleteAccount setBool={setBool} profile={profile} user_id={user_id}/>}
  </>
  );
};

export default ProfileSection;
