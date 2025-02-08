import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";


export default function ErrorModal({errorOpen, setErrorOpen}){
    return (
        <Modal open={errorOpen} onClose={() => setErrorOpen(false)}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "20%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "red" }}>
            ⚠️ Missing Information!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Please fill in all required details before proceeding!
          </Typography>
          <Button
            variant="contained"
            onClick={() => setErrorOpen(false)}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>
    )
}