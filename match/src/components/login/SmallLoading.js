import React from "react";
import { CircularProgress, Box } from "@mui/material";

function CustomCircularProgress() {
  return (
    <Box sx={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent overlay
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
    }}>
      <CircularProgress
        variant="indeterminate"
        size={40}
        thickness={5}
        sx={{
          color: "transparent",
          "& .MuiCircularProgress-circle": {
            stroke: "url(#gradient)"
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
