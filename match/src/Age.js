import React, { useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const InputDesign = () => {
  const [selectedDate, setSelectedDate] = useState(null);

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
      fontSize: "24px",
      color: "#000",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: 0,
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
    },
    subtitle: {
      fontSize: { xs: "14px", sm: "16px" },
      color: "#666",
    },
    inputContainer: {
      width: "80%",
      maxWidth: "300px",
      margin: "20px 0",
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
          <Typography sx={styles.title}>填写用户名</Typography>
          <Typography sx={styles.subtitle}>希望大家怎么称呼你</Typography>

          <Box sx={styles.inputContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                sx={{
                  width: "100%",
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    inputProps: {
                      style: { textAlign: "center" },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          <Button sx={styles.nextButton}>下一步</Button>
        </Box>

        <Box sx={styles.progressContainer}>
          <Typography sx={styles.progressText}>基础资料(14/14)</Typography>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={styles.progressBar}
          />
          <Typography sx={styles.progressNote}>
            为打造100%真实的交友平台，请如实填写资料，不真实的资料审核时将会被拒绝。
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InputDesign;
