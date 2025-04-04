"use client";
import React from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SupportUs = ({ onClose }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleContactClick = () => {
    console.log("Contact button clicked");
  };
  function handleClose() {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FAFAFA",
        fontFamily: '"Inter", sans-serif',
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px 12px 20px",
          position: "sticky",
          top: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 10,
          borderBottom: "1px solid #E0E0E0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 16,
            color: "#333",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          onClick={() => navigate(-1)}
        >
          <i
            className="ti ti-chevron-left"
            style={{ fontSize: "20px", color: "#555" }}
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          Support Us
        </Typography>
      </Box>

      {/* SCROLLABLE CONTENT */}
      <Box
        sx={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {/* INTRO SECTION */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "8px",
          }}
        >
          Support Uni-Match
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
          Building <strong>Uni-Match</strong> has been a rewarding but
          challenging journey. From countless late nights of coding to testing
          and refining the platform — it’s been a true labor of love. But
          maintaining and improving an app isn’t easy.
          <br />
          <br />
          Your support can make a real difference! Whether it’s through valuable
          feedback, spreading the word, or even a financial contribution — every
          bit of help allows me to keep Uni-Match running smoothly and introduce
          exciting new features.
          <br />
          <br />
          If Uni-Match has helped you connect with someone special or simply
          made your campus life a little easier — consider showing your support.
          Together, we can make Uni-Match even better for the entire LPU
          community.
        </Typography>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          padding: "12px 16px",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
          borderTop: "1px solid #E0E0E0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => window.open("https://buymeacoffee.com/unimatch")}
          variant="contained"
          sx={{
            py: 1.5,
            width: "40%",
            borderRadius: "25px",
            bgcolor: "#ff6b9c",
            fontSize: "14px",
            "&:hover": {
              bgcolor: "#ff5c8f",
            },
            textTransform: "none",
            boxShadow: "none",
            transition: "all 0.2s ease",
          }}
        >
          <i className="ti ti-heart-handshake" style={{ fontSize: "20px" }} />{" "}
          Support
        </Button>
      </Box>

    </Box>
  );
};

export default SupportUs;
