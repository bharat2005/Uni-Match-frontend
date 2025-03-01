import { useContext, useState } from "react";
import { Box, Button, Snackbar, Alert} from '@mui/material';
import LoginModal from './LoginModal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../AuthProvider";


const user_id = 1;

export default function Login() {
  const navigate = useNavigate();
  const  {login, loginStatus} = useAuth();
  const [lpuLogin, setLpuLogin] = useState({ regNo: '', password: '', user_id});
  const [open, setOpen] = useState(false);
  const [barOpen, setBarOpen] = useState(false)
  const [loading, setLoading] = useState(false)


  function handleLogin(e) {
    setLpuLogin(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  function handleLoginSubmit(e){
    e.preventDefault();
    setLoading(true)
    axios.post("https://api.uni-match.in/login", lpuLogin, {withCredentials:true})
    .then(response => {

        if (response.data.message == 'Login'){
        login(true)
        setOpen(false)
        setLoading(false)
        setBarOpen(true)
        response.data.nbool ? navigate('/dashboard', { replace: true }) : navigate('/profile-setup', { replace: true })
        }
        else{
            login(false)
            setOpen(false)
            setLoading(false)
            setBarOpen(true)
        }
     })
    .catch(error => {
      console.error(error)
      login(false)
      setOpen(false)
      setLoading(false)
      setBarOpen(true)
    })
    
  }


  return (
<>
    <LoginModal
    loading={loading}
    open={open}
    lpuLogin={lpuLogin}
    setOpen={setOpen}
    handleLogin={handleLogin}
    handleLoginSubmit={handleLoginSubmit}
  />


    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width:'100vw',
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
        onClick={()=>{setOpen(true); setBarOpen(false)}}
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


<Snackbar
      open={barOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert  severity={loginStatus?'success':'error'} sx={{ width: "100%" }}>
          {loginStatus?'Login successful! Redirecting...':'Incorrect username or password. Please try again'}
        </Alert>
      </Snackbar>
    </Box>
    </>
  );
}
