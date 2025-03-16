import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { borderRadius } from "@mui/system";
import { set } from "date-fns";

const InputDesign = ({ setStep, formData, setFormData }) => {
  const styles = {
    appContainer: {
      background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
      minHeight: "95dvh",
      padding: "20px",
      fontFamily: '"Noto Sans SC", sans-serif',
      position: "relative",
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      minWidth: "auto",
      padding: 0,
      color: "#000",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "25%",
      paddingTop: { xs: "80px", sm: "100px" },
      gap: "6px",
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
    },
    inputContainer: {
      width: "80%",
      maxWidth: "300px",
      margin: "30px 0 50px 0",
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        backgroundColor: "#fff",
        "& fieldset": {
          borderColor: "#ddd",
        },
      },
      "& .MuiInputBase-input": {
        textAlign: "center",
        fontSize: { xs: "14px", sm: "16px" },
        padding: "12px 16px",
      },
    },
    nextButton: {
      color: "#fff",
      padding: "12px 0",
      width: "80%",
      maxWidth: "300px",
      borderRadius: "25px",
      fontSize: { xs: "14px", sm: "16px" },
      textTransform: "none",
      backgroundColor: "#ff69b4",
      "&:hover": {
        backgroundColor: "#ff50a7",
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
      color: "#333",
      marginBottom: "8px",
    },
    progressBar: {
      height: "4px",
      borderRadius: "2px",
      backgroundColor: "#e0e0e0",
      "& .MuiLinearProgress-bar": {
        backgroundColor: "#ff69b4",
      },
    },
    progressNote: {
      fontSize: "12px",
      color: "#666",
      marginTop: "8px",
    },
  };

  return (
    <Box sx={styles.contentContainer}>
      <Typography variant="h1" sx={styles.title}>
        Enter your name
      </Typography>
      <Typography sx={styles.subtitle}>
        This will be your display name
      </Typography>

      <Box sx={styles.inputContainer}>
        <TextField
          value={formData["name"]}
          placeholder="enter name"
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent", // Default border color
              },
              "&:hover fieldset": {
                borderColor: "transparent", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#b3d1ff", // Soft blue when focused
                boxShadow: "0 0 5px rgba(179, 209, 255, 0.5)", // Removes the blue border when focused
              },
            },
          }}
        />
      </Box>

      <Button
        onClick={() => {
          setStep(1);
        }}
        disabled={!formData["name"]}
        sx={{
          color: "white !important",
          padding: "12px 0",
          width: "80%",
          maxWidth: "300px",
          borderRadius: "25px",
          fontSize: { xs: "14px", sm: "16px" },
          textTransform: "none",
          backgroundColor: formData["name"] ? "#ff69b4" : "#fed8e6",
          "&:hover": {
            backgroundColor: formData["name"] ? "#ff69b4" : "#fed8e6",
          },
        }}
      >
        Next Step
      </Button>
    </Box>
  );
};

export default InputDesign;
