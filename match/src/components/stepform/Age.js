import React, { useState } from "react";
import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";



const calculateAge = (year, month, day) => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};


const InputDesign = ({formData, setFormData, setStep}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      marginTop:'25%',
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
      color: "white !important",
      padding: "12px 0",
      width: "80%",
      maxWidth: "300px",
      borderRadius: "25px",
      fontSize: { xs: "14px", sm: "16px" },
      textTransform: "none",
      backgroundColor: formData['age'] ? "#ff69b4" : "#fed8e6",
      "&:hover": {
        backgroundColor: formData['age'] ? "#ff69b4" : "#fed8e6",
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

  function handleDateSelect(newDate) {
    if (!newDate) return; 
  
    setSelectedDate(newDate); 
  
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const calculatedAge = calculateAge(year, month, day);
  
    setFormData(prev => {
      const updatedFormData = { ...prev, age: calculatedAge };
      return updatedFormData;
    });
  }

  return (


        <Box sx={styles.contentContainer}>
          <Typography variant='h1' sx={styles.title}>When's your birthday?</Typography>
          <Typography sx={styles.subtitle}>This helps us personalize your experience</Typography>

          <Box sx={styles.inputContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateSelect}
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

          <Button disabled={!formData['age']} onClick={()=> {setStep(3)}} sx={styles.nextButton}>Next Step</Button>
        </Box>

    
  );
};

export default InputDesign;
