"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";

const SupportUs = ({ onClose }) => {
  const [open, setOpen] = useState(false);

  const handleSupportClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          padding: "12px 20px",
          position: "sticky",
          top: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 10,
          borderBottom: "1px solid #E0E0E0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
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
          <i className="ti ti-chevron-left" style={{ fontSize: "20px", color: "#555" }} />
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          Support Us
        </Typography>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {/* TITLE */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "12px",
          }}
        >
          Help Us Keep Uni-Match Running 🚀
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "24px",
          }}
        >
        Uni-Match is created to make it easier for students to connect and build meaningful relationships within the campus community.
          <br />
          <br />
          Your support will help us keep the app running smoothly, introduce new features, and improve the overall experience. If you’ve enjoyed using Uni-Match, consider supporting us through a donation — every bit helps!
        </Typography>

        {/* HIGHLIGHT SECTION */}
        <Box
          sx={{
            padding: "12px",
            backgroundColor: "#E3F2FD",
            borderRadius: "8px",
            border: "1px solid #BBDEFB",
            color: "#1565C0",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="ti ti-heart" style={{ fontSize: "20px", color: "#1565C0" }} />
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "#1565C0",
              lineHeight: "1.5",
            }}
          >
            Your contributions directly help us maintain and grow Uni-Match. Thank you for being part of our community!
          </Typography>
        </Box>

        {/* SUPPORT BUTTON */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSupportClick}
          sx={{
            backgroundColor: "#1976D2",
            color: "#FFFFFF",
            padding: "10px 24px",
            fontSize: "15px",
            fontWeight: 500,
            borderRadius: "8px",
            textTransform: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          Support Uni-Match ❤️
        </Button>
      </Box>

      {/* CONFIRMATION MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "24px",
            textAlign: "center",
            outline: "none",
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#212121",
              marginBottom: "12px",
            }}
          >
            Support Uni-Match ❤️
          </Typography>

          {/* QR CODE */}
          <Box
            sx={{
              width: "160px",
              height: "160px",
              margin: "0 auto 16px",
              backgroundColor: "#F5F5F5",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Replace with actual QR code */}
            <Typography sx={{ fontSize: "14px", color: "#888" }}>
              QR Code Here
            </Typography>
          </Box>

          {/* UPI ID */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "15px",
              color: "#555",
              marginBottom: "16px",
            }}
          >
            UPI ID: <strong>bharatdeshmukh@upi</strong>
          </Typography>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                flex: 1,
                backgroundColor: "#F5F5F5",
                color: "#212121",
                padding: "8px",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#E0E0E0",
                },
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                flex: 1,
                backgroundColor: "#1976D2",
                color: "#FFFFFF",
                padding: "8px",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SupportUs;
