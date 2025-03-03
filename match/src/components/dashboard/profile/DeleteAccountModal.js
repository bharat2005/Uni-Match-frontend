import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";

const DeleteAccountModal = ({ open, onClose }) => {
  const  {logout} = useAuth()
  const navigate = useNavigate();

  function handleDeleteClick(){
    axios.get('https://api.uni-match.in/delaccount',{withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
    .then(response => {
      console.log(response.data)
      localStorage.removeItem("csrfToken")
      logout()
      navigate('/', { replace: true })
    })
    .catch(error => {
      console.error("Error: ", error)
      if (error.response?.status === 401) {

        axios.post("/refresh", {}, { withCredentials:true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })
  
          .then((refreshResponse) => {
  
              const csrfToken = refreshResponse.headers["x-csrf-token"]
              localStorage.setItem("csrfToken", csrfToken)
  
              axios.get("https://api.uni-match.in/delaccount", { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })
              .then((response) => {
                console.log("Protected Data (After Refresh):", response.data)
                localStorage.removeItem("csrfToken")
                logout()
                navigate('/', { replace: true })
              })
              .catch((retryError) => console.error("Failed after refresh:", retryError));
          })
          .catch(() => console.error("Session expired, please log in again."));
      }
    })
  }
  return (
    <Dialog open={open==1?true:false} onClose={onClose}>
      <DialogTitle>Confirm Delete Account</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
        Are you sure you want to delete account?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:'black'}}>
          Cancel
        </Button>
        <Button color='error' onClick={handleDeleteClick} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
