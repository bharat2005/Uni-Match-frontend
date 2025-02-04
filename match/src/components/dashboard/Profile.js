import React, { useState, useContext } from "react";
import { Box, Typography, Avatar, Button, Tab, Tabs, Container } from "@mui/material";
import {AuthContext} from '../../AuthProvider';


const Profile = () => {
  const {logout} = useContext(AuthContext);


  return (
    <Box
      sx={{
        position:'relative',
        backgroundColor:'white',
        width:'640px',
        height:'100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0px",
      }}
    >
    
      <Avatar
        alt="User Profile"
        sx={{ width: 100, height: 100, marginBottom: "20px" }}
      />
      <Typography variant="h5" gutterBottom>
        Bharat
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Reg No. 12413923
      </Typography>


      <Button variant="contained" onClick={logout}>Logout</Button>
    

    </Box>
  );
};

export default Profile;
