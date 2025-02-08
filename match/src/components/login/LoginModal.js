import React from 'react';
import { Box, Button, Typography, Modal, TextField, Fade,} from '@mui/material';



export default function LoginModal({open, handleClose, handleLogin, handleLoginSubmit, lpuLogin}){
    return (
        
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

          <form onSubmit={handleLoginSubmit}>
          <TextField
          required
            fullWidth
            type="number"
            name='regNo'
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
                '&.Mui-focused fieldset': { borderColor: 'black' },},
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
                marginBottom:'15px'},
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
              "&:hover":{backgroundColor:'#ffbf00'}
            }}
          >Login
          </Button>
          </form>

        </Box>
      </Fade>
    </Modal>
    )
}