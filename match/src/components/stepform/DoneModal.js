import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";


export default function DoneModal({doneOpen}){
  
    return (
        <Modal open={doneOpen}>
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            marginTop: "60%",
            backgroundColor: "white",
            padding: 3,
            paddingTop:3.5,
            borderRadius: 2,
            padding:'15px',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" 
          sx={{    
            color:'green',
            whiteSpace: "nowrap", 
            marginBottom: 2,
            textAlign: "center",
            fontSize: { xs: "1.3rem", sm: "1.75rem" },  
            }}>
            🎉Profile Created Successfully!
          </Typography>
          <Typography 
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}>
            <br/>
            Your profile is ready, and you're all set to begin your journey!<br/><br/>
            Welcome to the community! 🌟<br/><br/>

          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Modal>
    )
}