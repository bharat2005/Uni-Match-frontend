import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Fade, Backdrop } from '@mui/material';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from "react-router-dom";
import StepForm from './StepForm';

export default function Login() {
  //const { login, bool, profile } = useContext(AuthContext);
  //const navigate = useNavigate();
  

  const [open, setOpen] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [boolo, setBoolo] = useState(false)


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleLogin() {
    //login();
    setBoolo(true)
  }

  // useEffect(() => {
  //   if (bool) {
  //     if (profile) {
  //       navigate('/dashboard', { replace: true });
  //     } else {
  //       navigate('/profile-setup', { replace: true });
  //     }
  //   }
  // }, [bool, profile, navigate]);




if (boolo){
  return (
    <StepForm/>
  )
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

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
            <TextField
            required
              fullWidth
              type="number"
              label="Reg No."
              variant="outlined"
              margin="normal"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: 'black' },  
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },  
                  '&:hover fieldset': { borderColor: 'black' }, 
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
              }}
              
            />

  
            <TextField
            required
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& label.Mui-focused': { color: 'black' },  
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },  
                  '&:hover fieldset': { borderColor: 'black' }, 
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                  marginBottom:'15px'
                },
              }}
              
            />

           
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#ffbf00",
                color: "black",
                borderRadius: "8px",
                "&:hover":{backgroundColor:'#ffbf00'
          }
              }}
              
            >Login
            </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
