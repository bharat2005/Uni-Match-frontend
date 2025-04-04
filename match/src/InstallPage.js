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
      alert("App already installed in the device.");
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
          background:
            "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
          height: "97dvh",
          overflow: "hidden",
          padding: "20px",
          paddingTop:'0px',
          fontFamily: '"Inter", sans-serif',
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0%",
            padding: { xs: "20px 10px", md: "40px 20px" },
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <i
              className="ti ti-clover-filled"
              style={{
                fontSize: "36px",
                background:
                  "linear-gradient(145deg, #ff3c78 0%, #ff79b0 30%, #b985ff 70%, #5caeff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "background 0.3s ease-in-out",
              }}
            />
            <img src="/Uni-match-14-3-2025.png" style={{ width: "85%" }} />
          </Box>
                 <Box sx={{textAlign:'right'}}>
                  <img src="/beta.png" style={{ width: "15%", position:'relative', left:10 }} />
                  </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src="/sub.png" style={{ width: "40%" }} />
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            // backdropFilter: "blur(8px)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "28px" },
              color: "#ff69b4",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            Uni-Match-beta
          </Typography>

          {/* Short Intro Paragraph */}
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#424242",
              marginBottom: "12px",
            }}
          >
            Meet new people, build real connections, and explore campus life
            like never before! <strong>Uni-Match</strong> is exclusively for LPU
            students—whether for love, friendships, networking, or more.
          </Typography>

          {/* Bullet Points - Features */}
          <Box
            component="ul"
            sx={{ paddingLeft: "0", listStyle: "none", textAlign: "left" }}
          >
            {[
              <p style={{ margin: 0 }}>
                <strong>LPU Exclusive</strong> – Connect with verified students
                only.
              </p>,
              <p style={{ margin: 0 }}>
                <strong>Smart Matching </strong> – Find people who share your
                interests.
              </p>,
              <p style={{ margin: 0 }}>
                <strong>Safe & Secure</strong> – Private chats & verified
                profiles.
              </p>,
              <p style={{ margin: 0 }}>
                <strong>More Than Dating </strong> – Friends, networking, and
                fun!
              </p>,
            ].map((point, index) => (
              <Typography
                component="li"
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "6px",
                }}
              >
                <i
                  className="ti ti-check"
                  style={{
                    color: "#ff69b4",
                    fontSize: "18px",
                    marginRight: "8px",
                  }}
                />
                {point}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Install Button with Subtext */}
        <Button
          fullWidth
          onClick={handleClick}
          sx={{
            backgroundColor: "#ff69b4",
            color: "white !important",
            borderRadius: "12px",
            padding: { xs: "12px", md: "15px" },
            fontSize: "16px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ff4c94",
            },
          }}
        >
          Install Now
        </Button>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#777",
            marginTop: "6px",
          }}
        >
          Takes just a few seconds to install & start matching!
        </Typography>
      </Box>
    </>
  );
}
