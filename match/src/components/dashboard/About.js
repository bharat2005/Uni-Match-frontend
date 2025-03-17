"use client";
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";

const TextBoard = ({ onClose }) => {
  const handleContactClick = () => {
    window.location.href = `mailto:support@uni-match.in?subject=Feedback%20for%20Uni-Match`;
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FAFAFA",
        fontFamily: '"Inter", sans-serif',
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px 12px 20px",
          position: "sticky",
          top: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 10,
          borderBottom: "1px solid #E0E0E0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 16,
            color: "#333",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          onClick={onClose}
        >
          <i
            className="ti ti-chevron-left"
            style={{ fontSize: "20px", color: "#555" }}
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          About Developer
        </Typography>
      </Box>

      {/* SCROLLABLE CONTENT */}
      <Box
        sx={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {/* INTRO SECTION */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "15px",
            color: "#424242",
            lineHeight: "1.7",
            marginBottom: "16px",
          }}
        >
          Hey there! I'm Bharat Deshmukh, a student at{" "}
          <strong>Lovely Professional University (LPU)</strong>. I'm excited to
          introduce you to <strong>Uni-Match</strong> — a dating app crafted
          exclusively for the LPU community.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "15px",
            color: "#424242",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
          College life is full of opportunities — but let's be honest, meeting
          new people isn’t always easy. Between managing classes, assignments,
          and personal life, there’s barely time to expand your circle. That’s
          where Uni-Match comes in. It’s more than a dating app — it’s a
          platform where students can connect, make friends, and potentially
          find something meaningful. Whether you're looking for casual
          conversations, lifelong friendships, or even love — Uni-Match is
          designed to make those moments happen effortlessly.
        </Typography>

        {/* WHY I BUILT THIS SECTION */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "8px",
          }}
        >
          Why I Built This App
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
          The idea behind Uni-Match came from my own experiences. As students,
          we often stick to familiar friend groups, missing out on countless
          potential connections around us. It’s not about lacking social skills
          — it’s about the lack of a comfortable platform to meet new people in
          a natural way.
          <br />
          <br />I wanted to create something that breaks down those barriers.
          With Uni-Match, you're not swiping through strangers — you're
          connecting with fellow students who share your campus, your
          experiences, and your lifestyle. It’s about building a sense of
          community where genuine relationships can thrive.
        </Typography>

        {/* HOW IT WORKS SECTION */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "8px",
          }}
        >
          How It Works
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
          Uni-Match is simple and intuitive!
          <ul style={{ textAlign: "left" }}>
            <li>
              Sign up with your LPU credentials — ensuring a trusted
              environment.
            </li>
            <li>
              Create a profile that reflects your personality — your interests,
              goals, and vibe.
            </li>
            <li>
              Start matching with fellow students based on shared interests and
              preferences.
            </li>
            <li>
              Message, connect, and meet up — all within a secure and private
              platform.
            </li>
          </ul>
          No spam, no awkward setups — just authentic connections.
        </Typography>

        {/* SUPPORT SECTION */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "8px",
          }}
        >
          Support Uni-Match
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
          Developing Uni-Match as a student has been an incredible journey. From
          countless late nights of coding to testing and refining the platform —
          it’s been a labor of love. But maintaining an app isn’t easy. Your
          support — whether it’s feedback, spreading the word, or financial
          backing — will help me keep the app running smoothly and introduce new
          features to make it even better.
        </Typography>

        {/* LET'S CONNECT SECTION */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "8px",
          }}
        >
          Let’s Connect
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "16px",
          }}
        >
          Got feedback or ideas? I’d love to hear from you. Reach out to me at{" "}
          <strong style={{ color: "#1976D2", fontWeight: 500 }}>
            @uni-match.in
          </strong>
          . Whether it's feature suggestions or just a friendly chat — I'm all
          ears.
        </Typography>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          padding: "12px 16px",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
          borderTop: "1px solid #E0E0E0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
        onClick={handleContactClick}
          variant="contained"
          sx={{
            py: 1.5,
            width: "40%",
            borderRadius: "25px",
            bgcolor: "#ff6b9c",
            fontSize: "14px",
            "&:hover": {
              bgcolor: "#ff5c8f",
            },
            textTransform: "none",
            boxShadow: "none",
            transition: "all 0.2s ease",
          }}
        >
          <i className="ti ti-mail-filled" style={{ fontSize: "18px" }} />{" "}
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default TextBoard;
