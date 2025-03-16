import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../AuthProvider";

const LogoutModal = ({ open, onClose }) => {
  const { logout } = useAuth();
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
    <Dialog open={open == 1 ? true : false} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to log out?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "black" }}>
          Cancel
        </Button>
        <Button
          sx={{ backgroundColor: "black !important" }}
          onClick={handleClick}
          variant="contained"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
