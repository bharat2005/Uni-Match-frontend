"use client";
import * as React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fce7f3, #e0f2fe)",
    padding: "20px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    padding: {
      xs: "0 20px",
      sm: 0,
    },
  },
  checkCircle: {
    width: "64px",
    height: "64px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkIcon: {
    color: "white",
    fontSize: "32px",
  },
  statusText: {
    fontFamily: '"Noto Sans SC", sans-serif',
    fontSize: "18px",
    color: "#333",
    marginBottom: "40px",
    fontWeight: "normal",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "12px",
    padding: {
      xs: 0,
      sm: 0,
    },
  },
  confirmButton: {
    backgroundColor: "#ec4899",
    color: "white",
    fontFamily: '"Noto Sans SC", sans-serif',
    padding: "14px",
    borderRadius: "12px",
    fontSize: "16px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#d946ef",
    },
  },
  profileButton: {
    backgroundColor: "white",
    color: "#666",
    fontFamily: '"Noto Sans SC", sans-serif',
    padding: "14px",
    borderRadius: "12px",
    fontSize: "16px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  },
};

function RegistrationComplete() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Box sx={styles.container}>
        <Container sx={styles.wrapper}>
          <Box sx={styles.checkCircle}>
            <CheckIcon sx={styles.checkIcon} />
          </Box>
          <Typography component="h1" sx={styles.statusText}>
            恭喜你完成注册
          </Typography>
          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={styles.confirmButton}
            >
              确定
            </Button>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={styles.profileButton}
            >
              个人中心
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default RegistrationComplete;
