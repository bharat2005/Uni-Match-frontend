import { Modal, Typography, Box, Button } from "@mui/material";
import axios from 'axios';
import {useAuth} from '../../AuthProvider';
import { useNavigate } from "react-router-dom";

export default function LogOutModal({ open, handleClose, handleLogout }) {
  const {logout} = useAuth();
  const navigate = useNavigate();


  
  function handleClick() {
    axios
      .get("https://api.uni-match.in/logout", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("csrfTokenAccess");
        localStorage.removeItem("csrfTokenRefresh");
        localStorage.removeItem("value");
        logout();
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
                .get("https://api.uni-match.in/logout", {
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
                  logout();
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
      });
  }

  return (
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
          outline: "none"
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#212121",
            marginBottom: "12px",
          }}
        >
          Confirm Logout
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Are you sure you want to log out? You’ll need to log back in to continue using the app.
        </Typography>

        {/* Buttons */}
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
            onClick={handleClick}
            sx={{
              flex: 1,
              backgroundColor: "#ff4757",
              color: "#FFFFFF",
              padding: "8px",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "24px",
              "&:hover": {
                backgroundColor: "#ff3747",
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
