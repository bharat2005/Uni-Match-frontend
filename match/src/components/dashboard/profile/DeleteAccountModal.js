import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import axios from 'axios';

const DeleteAccountModal = ({ open, onClose }) => {

  function handleDeleteClick(){
    axios.get('https://api.uni-match.in/delaccount',{withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
    .then(response => {
      console.log(response.data.message)
    })
    .catch(error => {
      console.error("Error: ", error)
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
