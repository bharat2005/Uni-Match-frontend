"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function SpinningLoader() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 30) % 360);
    }, 100); // Adjust the interval for smoother or faster rotation

    return () => clearInterval(interval);
  }, []);

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
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.1s linear",
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
    </Box>
  );
}

export default SpinningLoader;
