"use client";
import React from "react";
import { Box } from "@mui/material";

const GradientWave = () => {
  // Inline styles
  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    waveContainer: {
      position: "relative",
      width:"400px",
      top: 0,
      left: 0,
      height: "400px",
    },
    waveSvg: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.waveContainer}>
        <svg viewBox="0 0 100 100" style={styles.waveSvg}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff69b4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <g className="waves">
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="url(#gradient)"
              fillOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="15;45"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.15;0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="url(#gradient)"
              fillOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="15;45"
                dur="2.5s"
                begin="0.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.15;0"
                dur="2.5s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="url(#gradient)"
              fillOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="15;45"
                dur="2.5s"
                begin="1.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.15;0"
                dur="2.5s"
                begin="1.6s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="url(#gradient)"
              fillOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="15;45"
                dur="2.5s"
                begin="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.15;0"
                dur="2.5s"
                begin="2.4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <image
            href="/mainlogo.png"
            x="34"
            y="34"
            width="32"
            height="32"
           // opacity={0.6}
          />
        </svg>
      </Box>
      {/* Font import for Inter */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Box>
  );
};

export default GradientWave;
