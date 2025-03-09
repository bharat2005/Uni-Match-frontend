import React from 'react';
import { Box, Button, Typography, Modal, TextField, CircularProgress  } from '@mui/material';

 
export default function LoginModal({ loading, open, setOpen, handleLogin, lpuLogin, handleLoginSubmit}) {
  return (
    <Modal open={open} onClose={()=>setOpen(false)}>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: "50%",
          backgroundColor: "white",
          padding: 3,
          paddingTop:3.5,
          borderRadius: 2,
          border:'3px solid #fd7e14',
          padding:'15px',
          boxShadow: 24,
        }}
      >
          <Typography variant="h5" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign:'center' }}>
            Login
          </Typography>

          <form onSubmit={handleLoginSubmit}>
            <TextField
              required
              fullWidth
              type="number"
              name="regNo"
              label="Reg No."
              variant="outlined"
              margin="normal"
              value={lpuLogin['regNo']}
              onChange={handleLogin}
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
              name="password"
              variant="outlined"
              margin="normal"
              value={lpuLogin['password']}
              onChange={handleLogin}
              sx={{
                '& label.Mui-focused': { color: 'black' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                  marginBottom: '15px',
                },
              }}
            />

            <Button 
              fullWidth
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: '12px',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '8px',
                '&:hover': { backgroundColor: 'black', color:'white' },
                fontSize: '1rem',
              }}
            >
             {loading ? <CircularProgress sx={{ color: '#fd7e14', width:'10% !important' }}/>: 'Login'}
            </Button>
          </form>
        </Box>
    </Modal>
  );
}
