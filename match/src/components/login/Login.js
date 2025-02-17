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

  return (
<>
    <LoginModal
    open={open}
    setOpen={setOpen}
    handleLogin={handleLogin}
    handleLoginSubmit={handleLoginSubmit}
    lpuLogin={lpuLogin}
  />


    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url(/signs/webback.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
        border:'3px solid black',
        boxSizing: 'border-box',
      }}
    >
    
      <img
        src='/signs/Match.png'
        alt="Logo"
        draggable='false'
        style={{
          width: '100%', 
          maxWidth: '300px', 
          marginBottom: '300px', 
        }}
      />

      
      <Button
        variant="contained"
        onClick={()=>setOpen(true)}
        sx={{
          backgroundImage: 'url(/signs/but.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '80%', 
          maxWidth: '450px', 
          borderRadius: '8px',
          height: '50px',
          textAlign: 'center',
          display: 'block',
        }}
      >
      </Button>
    </Box>
    </>
  );
}
