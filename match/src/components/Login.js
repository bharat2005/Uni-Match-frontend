import React, {useContext, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from "react-router-dom";


export default function Login(){
  const {login, bool, profile} = useContext(AuthContext)
  const navigate = useNavigate();

  function handleLogin() {
    login()
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
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', backgroundColor:'#ffbf00'}}>
        <Button variant="contained"  onClick={handleLogin} sx={{backgroundColor:'black',
          color:'white',
          width:'500px',
          transition: "background-color 0.3s",
            '&:hover': {
              backgroundColor: "white",
              boxShadow:'none',
              color:'black'
            },
          boxShadow:'none', 
          borderRadius:'50px', 
          height:'60px',
          fontSize:'20px',
          fontWeight:'bold'}}
          >
            Login with LPU
            </Button>
      </Box>
    )
}