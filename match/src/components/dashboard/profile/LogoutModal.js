import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import axios from 'axios';

const LogoutModal = ({ open, onClose, user_id }) => {

  return (
    <Dialog open={open==1?true:false} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:'black'}}>
          Cancel
        </Button>
        <Button sx={{backgroundColor: 'black !important'}} variant="contained">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
