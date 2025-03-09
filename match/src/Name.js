"use client";
import * as React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const InputDesign = () => {
  const [username, setUsername] = useState("主持人婉室");

  const styles = {
    appContainer: {
      background: "linear-gradient(135deg, #ffe5ec 0%, #e5f0ff 100%)",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: '"Noto Sans SC", sans-serif',
      position: "relative",
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      minWidth: "unset",
      padding: 0,
      color: "#000",
      "& svg": {
        fontSize: "24px",
      },
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: { xs: "80px", sm: "100px" },
      gap: "16px",
    },
    title: {
      fontSize: { xs: "20px", sm: "24px" },
      fontWeight: 500,
      color: "#000",
      textAlign: "center",
    },
    subtitle: {
      fontSize: { xs: "14px", sm: "16px" },
      color: "#666",
      marginTop: "8px",
      textAlign: "center",
    },
    inputContainer: {
      width: "80%",
      maxWidth: "300px",
      marginTop: "20px",
    },
    input: {
      width: "100%",
      "& .MuiInputBase-input": {
        textAlign: "center",
        padding: "12px 16px",
        fontSize: { xs: "14px", sm: "16px" },
        backgroundColor: "#fff",
        borderRadius: "25px",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
      },
    },
    nextButton: {
      color: "#fff",
      padding: "14px 0",
      width: "80%",
      maxWidth: "300px",
      borderRadius: "25px",
      marginTop: "40px",
      fontSize: { xs: "14px", sm: "16px" },
      backgroundColor: "#ff69b4",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#ff69b4",
      },
    },
    progressContainer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: { xs: "16px", sm: "20px" },
    },
    progressText: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "8px",
    },
    progressBar: {
      width: "100%",
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "#e0e0e0",
      overflow: "hidden",
      position: "relative",
    },
    progressFill: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ff69b4",
      position: "absolute",
    },
    progressNote: {
      fontSize: "12px",
      color: "#666",
      marginTop: "8px",
    },
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Box sx={styles.appContainer}>
        <Button sx={styles.backButton}>
          <ChevronLeftIcon />
        </Button>

        <Box sx={styles.contentContainer}>
          <Typography component="h1" sx={styles.title}>
            填写用户名
          </Typography>
          <Typography component="p" sx={styles.subtitle}>
            希望大家怎么称呼你
          </Typography>

          <Box sx={styles.inputContainer}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              fullWidth
              sx={styles.input}
              InputProps={{
                sx: { height: "100%" },
              }}
            />
          </Box>

          <Button variant="contained" sx={styles.nextButton}>
            下一步
          </Button>
        </Box>

        <Box sx={styles.progressContainer}>
          <Typography sx={styles.progressText}>基础资料(14/14)</Typography>
          <Box sx={styles.progressBar}>
            <Box sx={styles.progressFill} />
          </Box>
          <Typography sx={styles.progressNote}>
            为打造100%真实的交友平台，请如实填写资料，不真实的资料审核时将会被拒绝。
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InputDesign;
