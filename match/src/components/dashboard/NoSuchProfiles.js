"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";

const GradientWave = () => {
  // Inline styles
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    waveContainer: {
      position: "relative",
      width: "340px",
      opacity: 0.4,
      top: 0,
      left: 0,
      display: "flex",

      // height: "340px",
    },
  };

  return (
    <>
      <Player autoplay loop src={"/emptypro.json"} style={{ width: "220px" }} />
      <Box
        sx={{
          fontSize: "18px",
          position: "relative",
          bottom: 50,
          color: "#888",
        }}
      >
        No such profiles!
      </Box>
    </>
  );
};

export default GradientWave;
