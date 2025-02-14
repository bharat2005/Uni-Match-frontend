import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

export default function ErrorModal({ errorOpen, setErrorOpen }) {
  return (
    <Modal open={errorOpen} onClose={() => setErrorOpen(false)}>
      <Box
        sx={{
          width: { xs: 320, sm: 400 }, // Adjust width for mobile screens
          margin: "auto",
          marginTop: '70%', // Adjust top margin for smaller screens
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "red",
            fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for mobile and desktop
          }}
        >
          ⚠️ Missing Information!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size for readability
          }}
        >
          Please fill in all required details before proceeding!
        </Typography>
        <Button
          variant="contained"
          onClick={() => setErrorOpen(false)}
          sx={{
            width: "100%",
            padding: { xs: "8px", sm: "10px" }, // Adjust padding for mobile
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffbf00" },
            fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust button text size
          }}
        >
          Okay
        </Button>
      </Box>
    </Modal>
  );
}
