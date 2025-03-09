"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function GenderSelectionForm() {
  const [selectedGender, setSelectedGender] = useState("male");

  const MaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#6B7AFF"
      />
      <path
        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
        fill="#6B7AFF"
      />
    </svg>
  );

  const FemaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill="#FF6B98"
      />
      <path
        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
        fill="#FF6B98"
      />
    </svg>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
        p: 2.5,
        fontFamily: '"Noto Sans SC", sans-serif',
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 20, left: 20 }}
        onClick={() => console.log("back clicked")}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Container maxWidth="md" sx={{ mt: 7.5 }}>
        <Typography
          variant="h1"
          sx={{ fontSize: 24, fontWeight: 500, textAlign: "center", mb: 1 }}
        >
          你的性别是？
        </Typography>

        <Typography
          sx={{ fontSize: 14, color: "#666", textAlign: "center", mb: 5 }}
        >
          确认后无法修改
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1.25, sm: 2.5 },
            mb: 7.5,
          }}
        >
          <Box
            onClick={() => setSelectedGender("male")}
            sx={{
              width: { xs: 120, sm: 140 },
              height: { xs: 120, sm: 140 },
              borderRadius: 2,
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              border:
                selectedGender === "male"
                  ? "2px solid #ff97b5"
                  : "2px solid transparent",
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                mb: 1.5,
              }}
            >
              <MaleIcon />
            </Box>
            <Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}>
              男
            </Typography>
            {selectedGender === "male" && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#ff97b5",
                }}
              />
            )}
          </Box>

          <Box
            onClick={() => setSelectedGender("female")}
            sx={{
              width: { xs: 120, sm: 140 },
              height: { xs: 120, sm: 140 },
              borderRadius: 2,
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              border:
                selectedGender === "female"
                  ? "2px solid #ff97b5"
                  : "2px solid transparent",
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                mb: 1.5,
              }}
            >
              <FemaleIcon />
            </Box>
            <Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}>
              女
            </Typography>
            {selectedGender === "female" && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "#ff97b5",
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Typography sx={{ fontSize: 14, color: "#666", mb: 1 }}>
            基础资料(2/14)
          </Typography>

          <Box
            sx={{
              height: 4,
              bgcolor: "#e0e0e0",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "14%",
                height: "100%",
                background: "linear-gradient(90deg, #ff97b5, #ff6b98)",
              }}
            />
          </Box>

          <Typography sx={{ fontSize: 12, color: "#666", mt: 1.5 }}>
            为打造100%真实的交友平台，请如实填写资料，不真实的资料审核时将会被拒绝。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default GenderSelectionForm;
