"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import SmallLoading from "../login/SmallLoading";

const DeleteProfile = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleDeleteClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  function handleDeleteClick2() {
    setLoading(true);
    axios
      .get("https://api.uni-match.in/delaccount", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("csrfTokenAccess");
        localStorage.removeItem("csrfTokenRefresh");
        localStorage.removeItem("value");
        login(false);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error: ", error);
        if (error.response?.status === 401) {
          axios
            .post(
              "https://api.uni-match.in/refresh",
              {},
              {
                withCredentials: true,
                headers: {
                  "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
                },
              },
            )

            .then((response) => {
              const csrfTokenAccess = response.headers["x-csrf-token-access"];
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

              axios
                .get("https://api.uni-match.in/delaccount", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data);
                  localStorage.removeItem("csrfTokenAccess");
                  localStorage.removeItem("csrfTokenRefresh");
                  localStorage.removeItem("value");
                  login(false);
                  navigate("/", { replace: true });
                })
                .catch((retryError) =>
                  console.error("Failed after refresh:", retryError),
                );
            })
            .catch(() =>
              console.error("Session expired, please log in again."),
            );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {loading && <SmallLoading />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FAFAFA",
          fontFamily: '"Inter", sans-serif',
          zIndex: 9,
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
            Delete Profile
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
            Are you sure you want to delete your profile?
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
            Deleting your profile will permanently erase all your data,
            including likes, matches and conversations. This action{" "}
            <strong>cannot be undone</strong>.
            <br />
            <br />
            If you have any concerns or need assistance, feel free to contact us
            before proceeding.
          </Typography>

          {/* WARNING SECTION */}
          <Box
            sx={{
              padding: "12px",
              backgroundColor: "#FFF3CD",
              borderRadius: "8px",
              border: "1px solid #FFE69C",
              color: "#856404",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i
              className="ti ti-alert-triangle"
              style={{ fontSize: "20px", color: "#856404" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "#856404",
                lineHeight: "1.5",
              }}
            >
              Once deleted, your profile and all associated data cannot be
              recovered.
            </Typography>
          </Box>

          {/* DELETE BUTTON */}
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            sx={{
              backgroundColor: "#D32F2F",
              color: "#FFFFFF",
              padding: "10px 24px",
              fontSize: "15px",
              fontWeight: 500,
              borderRadius: "24px",
              textTransform: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#B71C1C",
              },
            }}
          >
            Delete Profile Permanently
          </Button>
        </Box>

        {/* CONFIRMATION MODAL */}
        <Modal open={open} onClose={handleClose}>
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
              outline: "none", // Fix for focusing issue
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#212121",
                marginBottom: "12px",
              }}
            >
              Confirm Profile Deletion
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "15px",
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "24px",
              }}
            >
              Are you absolutely sure you want to delete your profile? This
              action is permanent and cannot be undone.
            </Typography>
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
                  borderRadius: "24px",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteClick2}
                sx={{
                  flex: 1,
                  backgroundColor: "#D32F2F",
                  color: "#FFFFFF",
                  padding: "8px",
                  fontSize: "14px",
                  fontWeight: 500,
                  borderRadius: "24px",
                  "&:hover": {
                    backgroundColor: "#B71C1C",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default DeleteProfile;
