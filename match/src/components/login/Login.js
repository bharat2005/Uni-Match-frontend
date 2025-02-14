import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import LoginModal from './LoginModal';
import axios from 'axios';

export default function Login() {
  const [lpuLogin, setLpuLogin] = useState({ regNo: '', password: '' });
  const [open, setOpen] = useState(false);

  function handleLogin(e) {
    setLpuLogin(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/login', lpuLogin)
      .then(response => {
        console.log('Message from server: ', response.data.message);
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'white',
        padding: 2,
        border:'3px solid black',
        boxSizing: 'border-box',
      }}
    >
      {/* Image with responsive width */}
      <img
        src='/signs/Match.png'
        alt="Logo"
        draggable='false'
        style={{
          width: '100%', // Adjust width to 50% of the screen on mobile
          maxWidth: '300px', // Max width for larger screens
          marginBottom: '300px', // Adjusted margin
        }}
      />

      {/* Button with responsive width */}
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundImage: 'url(/signs/but.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '80%', // Button width will take 80% of screen width
          maxWidth: '450px', // Max width for larger screens
          borderRadius: '8px',
          height: '50px',
          textAlign: 'center',
          display: 'block',
        }}
      >
      </Button>

      {/* Modal for login */}
      <LoginModal
        open={open}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleLoginSubmit={handleLoginSubmit}
        lpuLogin={lpuLogin}
      />
    </Box>
  );
}
