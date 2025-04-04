"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Container, Button } from "@mui/material";

function GenderSelectionForm({ formData, setFormData, handleDone }) {
  const IntrovertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" stroke="#6B7AFF" strokeWidth="2" />
      <line x1="9" y1="12" x2="15" y2="12" stroke="#6B7AFF" strokeWidth="2" />
    </svg>
  );

  const ExtrovertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" stroke="#FF6B98" strokeWidth="2" />
      <path d="M8 8 L12 12 L16 8" stroke="#FF6B98" strokeWidth="2" />
    </svg>
  );

  const AmbivertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" stroke="#FFA500" strokeWidth="2" />
      <path d="M9 10 H11 M13 10 H15" stroke="#FFA500" strokeWidth="2" />
    </svg>
  );

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5%",
        paddingTop: { xs: "80px", sm: "100px" },
        gap: "6px",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: 24, fontWeight: 500, textAlign: "center" }}
      >
        Define your personality
      </Typography>

      <Typography sx={{ fontSize: 14, color: "#666", textAlign: "center" }}>
        Choose the option that suits you most.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: { xs: 1.25, sm: 2.5 },
          margin: "30px 0 50px 0",
        }}
      >
        {[
          { symbol: <IntrovertIcon />, label: "Introvert" },
          { symbol: <ExtrovertIcon />, label: "Extrovert" },
          { symbol: <AmbivertIcon />, label: "Ambivert" },
        ].map((item) => {
          return (
            <Box
              onClick={() => {
                setFormData((prev) => ({ ...prev, personality: item.label }));
              }}
              sx={{
                width: { xs: 120, sm: 140 },
                height: { xs: 120, sm: 140 },
                borderRadius: 2,
                bgcolor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border:
                  formData["personality"] === item.label
                    ? "3px solid #ff97b5"
                    : "3px solid transparent",
                transition: "all 0.2s",
                outline: "none",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Box
                sx={{
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  mb: 1.5,
                }}
              >
                {item.symbol}
              </Box>
              <Typography
                sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Button
        disabled={!formData["personality"]}
        onClick={handleDone}
        sx={{
          color: "white !important",
          padding: "12px 0",
          width: "80%",
          maxWidth: "300px",
          borderRadius: "25px",
          fontSize: { xs: "14px", sm: "16px" },
          textTransform: "none",
          backgroundColor: formData["personality"] ? "#ff69b4" : "#fed8e6",
          "&:hover": {
            backgroundColor: formData["personality"] ? "#ff69b4" : "#fed8e6",
          },
        }}
      >
        Finish
      </Button>
    </Box>
  );
}

export default GenderSelectionForm;
