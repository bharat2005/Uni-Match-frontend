"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function PulsatingHeart() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeat((prevBeat) => (prevBeat + 1) % 3);
    }, 400);

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

  const wrapperStyle = {
    position: "relative",
    transform:
      beat === 1 ? "scale(1.15)" : beat === 2 ? "scale(1.08)" : "scale(1)",
    transition:
      beat === 0
        ? "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
    transform:
      beat === 1 ? "scale(1.12)" : beat === 2 ? "scale(1.06)" : "scale(1)",
    transition:
      beat === 0
        ? "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        : "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <Box component="section" sx={containerStyle}>
      <Box sx={wrapperStyle}>
        <Box sx={contentStyle}>
          <img
            //src="https://bharatbuckettiny.s3.eu-north-1.amazonaws.com/icons8-love-glassmorphism-96.png"
            src="/mainlogo.png"
            alt="Pulsating heart icon"
            style={imageStyle}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PulsatingHeart;
