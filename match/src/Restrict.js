"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

export default function InstallPage({ deferredPrompt }) {
  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User installed the app");
        } else {
          console.log("User dismissed the install prompt");
        }
      });
    } else {
      alert("Installation not supported on this browser.");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          width: "100vw",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          background:
            "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
        }}
      >
        <i
          className="ti ti-device-mobile-off"
          style={{
            fontSize: "48px",
            color: "#ff69b4",
            marginBottom: "10px",
          }}
        />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff69b4",
            marginBottom: "10px",
          }}
        >
          Oops! Uni-Match is Mobile-Only
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#555",
            maxWidth: "80%",
          }}
        >
          Please switch to a **mobile device** to access the app.
        </Typography>
      </Box>
    </>
  );
}
