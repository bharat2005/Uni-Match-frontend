import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

export default function ErrorModal({ errorOpen, setErrorOpen }) {
  return (
    <Modal open={errorOpen} onClose={() => setErrorOpen(false)}>
      <Box
        sx={{
          width: { xs: 320, sm: 400 },
          margin: "auto",
          marginTop: "70%",
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
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          ⚠️ Missing Information!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Please fill in all required details before proceeding!
        </Typography>
        <Button
          variant="contained"
          onClick={() => setErrorOpen(false)}
          sx={{
            width: "100%",
            padding: { xs: "8px", sm: "10px" },
            backgroundColor: "black",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffbf00" },
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          Okay
        </Button>
      </Box>
    </Modal>
  );
}
