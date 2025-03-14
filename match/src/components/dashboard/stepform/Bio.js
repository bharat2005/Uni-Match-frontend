import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const InputDesign = ({setStep, formData, setFormData}) => {

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
      marginTop:'25%',
      flexDirection: "column",
      alignItems: "center",
      paddingTop: { xs: "80px", sm: "100px" },
      gap: "6px",
    },
    title: {
      fontSize: 24,
      fontWeight: 500,
      textAlign: "center"
    },
    subtitle: {
      fontSize:14,
      color: "#666",
      textAlign: "center"
    },
    inputContainer: {
      width: "80%",
      maxWidth: "300px",
      margin: "30px 0 50px 0",
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        backgroundColor: "#fff",
        "& fieldset": {
          borderColor: "#ddd",
        },
      },
      "& .MuiInputBase-input": {
        fontSize: { xs: "14px", sm: "16px" },
        padding: "12px 16px",
        minHeight: "30px",
        lineHeight: "1.5",
      },
    },
    nextButton: {
      color: "white !important",
      padding: "12px 0",
      width: "80%",
      maxWidth: "300px",
      borderRadius: "25px",
      fontSize: { xs: "14px", sm: "16px" },
      textTransform: "none",
      backgroundColor: formData['bio'] ? "#ff69b4" : "#fed8e6",
      "&:hover": {
        backgroundColor: formData['bio'] ? "#ff69b4" : "#fed8e6",
      },
    },
  };

  return (


        <Box sx={styles.contentContainer}>
          <Typography variant="h1" sx={styles.title}>Tell us about yourself          </Typography>
          <Typography sx={styles.subtitle}>Introduce yourself in a few words</Typography>

          <Box sx={styles.inputContainer}>
            <TextField
              fullWidth
              sx={{
        
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#b3d1ff', // Soft blue when focused
                    boxShadow: '0 0 5px rgba(179, 209, 255, 0.5)' // Removes the blue border when focused
                  },
                
  },
              }}
              placeholder="A few words about yourself..."
              multiline
              rows={3}
              value={formData['bio']}
              onChange={(e) => setFormData( prev => ({ ...prev, bio:e.target.value}))}
              variant="outlined"
              InputProps={{
                style: {
                  alignItems: "flex-start",

                },
              }}
            />
          </Box>

          <Button disabled={!formData['bio']} onClick={()=> setStep(4)} sx={styles.nextButton}>Save & Next</Button>
        </Box>

  );
};

export default InputDesign;
