"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Container, Button } from "@mui/material";

function GenderSelectionForm({ formData, setFormData, setStep }) {
  const MaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="6" stroke="#6B7AFF" strokeWidth="2" />
      <path
        d="M14 6L20 2M20 2L20 8M21 2L14 1"
        stroke="#6B7AFF"
        strokeWidth="2"
      />
    </svg>
  );

  const FemaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="6" stroke="#FF6B98" strokeWidth="2" />
      <path d="M12 14V20M9 17H15" stroke="#FF6B98" strokeWidth="2" />
    </svg>
  );

  return (
    <Box
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25%",
        paddingTop: { xs: "80px", sm: "100px" },
        gap: "6px",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: 24, fontWeight: 500, textAlign: "center" }}
      >
        What's your gender?
      </Typography>

      <Typography sx={{ fontSize: 14, color: "#666", textAlign: "center" }}>
        Let us know how you identify
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "30px 0 50px 0",
          gap: { xs: 1.25, sm: 2.5 },
        }}
      >
        {["Male", "Female"].map((item) => {
          return (
            <Box
              onClick={() => {
                setFormData((prev) => ({ ...prev, gender: item }));
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
                  formData["gender"] === item
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
                {item == "Male" ? <MaleIcon /> : <FemaleIcon />}
              </Box>
              <Typography
                sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}
              >
                {item == "Male" ? "Male" : "Female"}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Button
        disabled={!formData["gender"]}
        onClick={() => setStep(2)}
        sx={{
          color: "white !important",
          padding: "12px 0",
          width: "80%",
          maxWidth: "300px",
          borderRadius: "25px",
          fontSize: { xs: "14px", sm: "16px" },
          textTransform: "none",
          backgroundColor: formData["gender"] ? "#ff69b4" : "#fed8e6",
          "&:hover": {
            backgroundColor: formData["gender"] ? "#ff69b4" : "#fed8e6",
          },
        }}
      >
        Next Step
      </Button>
    </Box>
  );
}

export default GenderSelectionForm;
