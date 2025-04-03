"use client";
import React from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SupportUs = ({ onClose }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleContactClick = () => {
    console.log("Contact button clicked");
  };
  function handleClose() {
    setOpen(false);
  }

  return (<>

<link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FAFAFA",
        fontFamily: '"Inter", sans-serif',
        zIndex: 10,
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
          onClick={() => navigate(-1)}
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
          Privacy Policy
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
  {/* PRIVACY POLICY SECTION */}
  <Typography
    variant="body2"
    sx={{
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.7",
      marginBottom: "24px",
    }}
  >
    Welcome to <strong>Uni-Match Beta</strong>. As this is a beta version, we are continuously improving the platform, and our privacy policies may evolve based on feedback and enhancements.
    
    <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
      <li>
        <strong>Data Collection:</strong> We collect necessary information such as your name, registration number, profile details, and interactions within the app.
      </li>
      <li>
        <strong>No Password Storage:</strong> Uni-Match Beta does not store, process, or have access to your LPU UMS password. Your university credentials are only used for verification purposes and are never saved.
      </li>
      <li>
        <strong>Usage of Data:</strong> Your data is used to enhance the beta experience, test platform functionality, and improve the final version of the app.
      </li>
      <li>
        <strong>Data Security:</strong> While we implement security measures to protect your information, this beta version is still in development, and security protocols may be updated.
      </li>
      <li>
        <strong>Message Privacy & Safety:</strong> Your messages are securely stored and only visible to you and the recipient. We continuously monitor platform security to ensure a safe and respectful dating experience.
      </li>
      <li>
        <strong>Sharing of Data:</strong> We do not sell or share your personal data with third parties, except when required by law or to ensure platform safety.
      </li>
      <li>
        <strong>Cookies & Tracking:</strong> Uni-Match Beta may use cookies to enhance testing and improve features. You can manage cookie preferences in your browser settings.
      </li>
      <li>
        <strong>Account Deletion:</strong> You have the right to delete your account and request the removal of your data at any time.
      </li>
    </ul>
    
    Since this is a beta version, your feedback is valuable in shaping the final release. If you have any concerns or suggestions, please reach out to us at{" "}
    <strong style={{ color: "#1976D2", fontWeight: 500 }}>support@uni-match.in</strong>.
  </Typography>
</Box>


    </Box>
 </> );
};

export default SupportUs;
