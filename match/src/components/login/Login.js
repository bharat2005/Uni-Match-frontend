import React, { useState } from 'react';
import { Box, Button, } from '@mui/material';
import LoginModal from './LoginModal';
import axios from 'axios';




export default function Login() {
  const [lpuLogin, setLpuLogin] = useState({regNo:'',password:''});
  const [open, setOpen] = useState(false);


function handleLogin(e){
  setLpuLogin(prev=>{
    return {...prev, [e.target.name]:e.target.value}
  })
}

  function handleLoginSubmit(e) {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login',lpuLogin)
    .then(responce => {
      console.log("Message from server: ", responce)
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }

  function handleOpen(){
    setOpen(true)
  }
  function handleClose(){
    setOpen(false)
  }


  return (
    <Box
      sx={{
        display: 'flex',
        width:'100vw',
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
        style={{ marginBottom: '350px' }}
      />

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundImage: 'url(/but.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '450px',
          borderRadius: '8px',
          height: '50px',
        }}
      />

    <LoginModal open={open} handleClose={handleClose} handleLogin={handleLogin} handleLoginSubmit={handleLoginSubmit} lpuLogin={lpuLogin}/>

    </Box>
  );
}
