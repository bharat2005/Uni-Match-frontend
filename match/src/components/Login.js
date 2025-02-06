import React, { useContext, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, bool, profile } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogin() {
    login();
  }

  useEffect(() => {
    if (bool) {
      if (profile) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/profile-setup', { replace: true });
      }
    }
  }, [bool, profile, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ffbf00',
        padding: 0,
      }}
    >
      <img
        src='/Match.png'
        width={'45%'}
        draggable='false'
        style={{marginBottom:'350px'}}
      />

      {/* Login Button */}
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: '450px',
          transition: "background-color 0.3s",
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white',
          },
          borderRadius: '50px',
          height: '50px',
          fontSize: '15px',
          fontWeight: 'normal',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src='/lpulogo.png'
          width={"33px"}
          height="auto"
          draggable="false"
          style={{ marginRight: '10px' }}
        />
        Login with LPU
      </Button>
    </Box>
  );
}
