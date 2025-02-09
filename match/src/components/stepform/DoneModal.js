import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import Dashboard from '../dashboard/Dashboard';


export default function DoneModal({doneOpen, bool, setBool}){
  
    return (
        <Modal open={doneOpen}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "15%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "green" }}>
            🎉 Profile Created Successfully!
          </Typography>
          <Typography>
            <br/>
            Your profile is ready, and you're all set to begin your journey!<br/><br/>
            Welcome to the community! 🌟<br/><br/>

          </Typography>
          <Button
            variant="contained"
            onClick={()=>setBool(true)}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Modal>
    )
}