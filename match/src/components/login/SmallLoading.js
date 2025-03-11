import React from "react";
import { CircularProgress, Box } from "@mui/material";

function CustomCircularProgress() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        borderRadius: "16px", // Soft rounded edges for the container
      }}
    >
      <CircularProgress
        variant="indeterminate"
        size={50} // Increased size for better visibility
        thickness={5} // Slightly thinner for a sleeker look
        sx={{
          color: "transparent", // Make the base transparent
          "& .MuiCircularProgress-circle": {
            stroke: "url(#gradient)",
            strokeLinecap: "round", // Round edges for a smooth feel
          },
        }}
      />
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff69b4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
}

export default CustomCircularProgress;

