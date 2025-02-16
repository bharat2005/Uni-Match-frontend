import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import axios from 'axios';

const LogoutModal = ({ open, onClose, selected, user_id }) => {

  function handleDeleteClick(){
    axios.post('http://127.0.0.1:5000/delaccount',{user_id})
    .then(response => {
      console.log(response.data.message)
    })
    .catch(error => {
      console.error("Error: ", error)
    })
  }
  return (
    <Dialog open={open==1?true:false} onClose={onClose}>
      <DialogTitle>{selected == 'logout' ? "Confirm Logout":"Confirm Delete Account"}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {selected == 'logout'? 'Are you sure you want to log out?' :'Are you sure you want to delete account?'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:'black'}}>
          Cancel
        </Button>
        <Button sx={{backgroundColor:selected == 'logout'? 'black !important ':'red !important'}} onClick={selected=='del'&& handleDeleteClick} variant="contained">
          {selected == 'logout'?'Logout':'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
