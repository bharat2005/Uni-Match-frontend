import React from 'react';
import { Box, Button, Typography, Modal, TextField, Fade } from '@mui/material';

export default function LoginModal({ open, handleClose, handleLogin, handleLoginSubmit, lpuLogin }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: "40%",
          backgroundColor: "white",
          padding: 3,
          paddingTop:3.5,
          borderRadius: 2,
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
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: '12px',
                backgroundColor: '#ffbf00',
                color: 'black',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#ffbf00' },
                fontSize: '1rem',
              }}
            >
              Login
            </Button>
          </form>
        </Box>
    </Modal>
  );
}
