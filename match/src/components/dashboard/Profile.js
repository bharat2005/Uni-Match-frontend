import React, { useState, useContext } from "react";
import { Box, Typography, Avatar, Button, Tab, Tabs, Container } from "@mui/material";
import {AuthContext} from '../../AuthProvider';


export default function Profile(){
  


  return (
    <Box
    sx={{
      height: "95%",
      bgcolor: "background.paper",
      boxShadow: 2,
      width:'500px',
      p: 2,
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none", 
      },
      msOverflowStyle: "none", 
      scrollbarWidth: "none",
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


      <Button variant="contained" >Logout</Button>
    

    </Box>
  );
};
