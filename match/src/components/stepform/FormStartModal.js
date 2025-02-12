import React, { useState } from "react"; 
import { Box, Typography, Modal, Button } from "@mui/material";

export default function FormStartModal() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <Modal open={openModal}>
      <Box
        sx={{
          width: "90%", // Use 90% width for smaller screens
          //maxWidth: 400, // Limit max width for larger screens
          margin: "auto",
          marginTop: "40%", // Adjusted margin for better alignment on smaller screens
          backgroundColor: "white",
          padding: 3,
          paddingTop:3.5,
          borderRadius: 2,
          padding:'15px',
          boxShadow: 24,
          // "@media (min-width:600px)": {
          //   marginTop: "12%", // Smaller margin on larger screens
          //   width: 400, // Keep the modal size limited on larger screens
          // },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.75rem" }, // Adjust font size for responsiveness
          }}
        >
          Let’s Set You Up!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size for readability
          }}
        >
          <br />
          The details you provide here will be used
          to create your profile and will help us recommend the perfect matches
          for you.💕
          <br />
          <br />
          Please fill them out truthfully! 💛
          <br />
          <br />
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenModal(false)}
          sx={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#ffbf00",
            color: "black",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#ffbf00" },
            fontSize: { xs: "1rem", sm: "1.2rem" }, // Adjust button font size for responsiveness
          }}
        >
          Let's go
        </Button>
      </Box>
    </Modal>
  );
}
