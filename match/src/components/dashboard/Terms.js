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
          Terms & Conditions
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
  <Typography
    variant="body2"
    sx={{
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.7",
      marginBottom: "24px",
    }}
  >
    Welcome to <strong>Uni-Match Beta</strong>. Since this is a beta version, the platform is still in development, and features or policies may change as we improve the app based on user feedback.
    
    By accessing or using Uni-Match Beta, you agree to the following terms:
    
    <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
      <li>
        <strong>Beta Testing Acknowledgment:</strong> You understand that this is a beta version, meaning certain features may not work as expected, and updates may occur frequently.
      </li>
      <li>
        <strong>Eligibility:</strong> You must be a current student of Lovely Professional University (LPU) to use this app.
      </li>
      <li>
        <strong>Responsible Use:</strong> You agree to use Uni-Match Beta for genuine connections and respectful interactions. Any harassment, bullying, or inappropriate content is strictly prohibited.
      </li>
      <li>
        <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account details and agree not to share your login credentials with others.
      </li>
      <li>
        <strong>No Password Storage:</strong> Uni-Match Beta does not store, process, or have access to your LPU UMS password. It is only used for verification purposes and is never saved.
      </li>
      <li>
        <strong>Content Ownership:</strong> Any content you post (photos, messages, etc.) remains yours, but by posting, you grant Uni-Match a limited license to display it within the app.
      </li>
      <li>
        <strong>Prohibited Activities:</strong> Users must not engage in spam, fake profiles, impersonation, or any illegal activities while using the app.
      </li>
      <li>
        <strong>Account Termination:</strong> Uni-Match Beta reserves the right to suspend or terminate accounts that violate these terms.
      </li>
      <li>
        <strong>Liability Disclaimer:</strong> Uni-Match Beta is a platform for connecting students, but we are not responsible for users' actions or interactions outside the app.
      </li>
      <li>
        <strong>Feedback & Bug Reporting:</strong> Since this is a beta version, we encourage users to report bugs, provide suggestions, and share feedback to help us improve the final release.
      </li>
    </ul>

    By continuing to use Uni-Match Beta, you acknowledge and accept these terms. If you have any questions or feedback, reach out at{" "}
    <strong style={{ color: "#1976D2", fontWeight: 500 }}>support@uni-match.in</strong>.
  </Typography>
</Box>



    </Box>
 </> );
};

export default SupportUs;
