"use client";
import * as React from "react";
import { Box } from "@mui/material";

function StaticLoader() {
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const imageStyle = {
    width: "68px",
    height: "68px",
    objectFit: "contain",
    backgroundColor: "transparent",
  };

  return (
    <Box component="section" sx={containerStyle}>
      <Box sx={contentStyle}>
        <img
          src="/heart.gif"
          alt="Static loader icon"
          style={imageStyle}
        />
      </Box>
    </Box>
  );
}

export default StaticLoader;
