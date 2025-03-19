"use client";
import * as React from "react";
import { Box } from "@mui/material";

function SpinningLoader() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f9f5ff",
  };

  const contentStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "24px",
    backgroundColor: "transparent",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const imageStyle = {
    width: "72px",
    height: "72px",
    objectFit: "contain",
    backgroundColor: "transparent",
    animation: "spin 1.5s linear infinite", // Continuous spin
  };

  return (
    <Box component="section" sx={containerStyle}>
      <Box sx={contentStyle}>
        <img
          // src="https://bharatbuckettiny.s3.eu-north-1.amazonaws.com/icons8-love-glassmorphism-96.png"
          src="/mainlogo.png"
          alt="Spinning loader icon"
          style={imageStyle}
        />
      </Box>
      {/* Define the keyframes using a global style */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default SpinningLoader;
