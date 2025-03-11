"use client";
import * as React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { fontWeight } from "@mui/system";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "95dvh",
    background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
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
    width: "75px",
    height: "75px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkIcon: {
    color: "white",
    fontSize: "50px",
    fontWeight:500,
  },
  statusText: {
    fontFamily: '"Noto Sans SC", sans-serif',
    fontSize: "22px",
    color: "#333",
    marginBottom: "60px",
    fontWeight: 500,
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
    backgroundColor: "#ff69b4",
    color: "white",
    fontFamily: '"Noto Sans SC", sans-serif',
    padding: "12px",
    borderRadius: "30px",
    fontSize: "18px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff69b4",
    },
  },

};

function RegistrationComplete() {
  return (
    
      <Box sx={styles.container}>
        <Container sx={styles.wrapper}>
          <Box sx={styles.checkCircle}>
            <CheckIcon sx={styles.checkIcon} />
          </Box>
          <Typography component="h1" sx={styles.statusText}>
          Profile setup complete!
          </Typography>
          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={styles.confirmButton}
            >
              Continue
            </Button>

          </Box>
        </Container>
      </Box>

  );
}

export default RegistrationComplete;
