import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Match from './dashboard/Match';
import Navbar from './dashboard/NavBar';
import Profile from './dashboard/Profile';
import Likes from './dashboard/Likes';
import Chats from './dashboard/Chats'

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const renderContent = () => {
    switch (value) {
      case 0:
        return <Match />;
      case 1:
        return <Likes />;
      case 2:
        return <Chats />;
      case 3:
        return <Profile />;
      default:
        return <Match/>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#ffbf00",
        
      }}
    >
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          width: "100%",
          height: "91%",
          position: "relative",
        }}
      >
        {renderContent()}
      </Box>

      <Navbar value={value} onChange={(event, newValue) => setValue(newValue)} />
    </Box>
  );
};

export default Dashboard;
