import React, { useState } from "react";
import { Box } from "@mui/material";
import MyStepper from "./MyStepper";
import UserForm from "./UserForm";
import ImagePickerCard from "./ImagePickerCard";
import Reason from "./Reason";
import Interest from "./Interest";
import Personality from "./Personality";
import FormStartModal from './FormStartModal';
import axios from 'axios';


export default function StepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: { day: '', month: '', year: '' },
    age: "",
    images: [null, null, null, null],
    reason: "",
    interests: [],
    personality: '',
  });

  function handleDone() {
    axios.post('https://api.uni-match.in/profile', formData, {withCredentials: true, headers: {"X-CSRF-TOKEN": getCsrfToken()}})
      .then(response => {
        console.log("Message from server: ", response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }

  function getCsrfToken() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrf_access_token="))
        ?.split("=")[1];
}

  function validateStep() {
    switch (step) {
      case 0:
        return (
          formData.name.trim() !== "" &&
          formData.gender !== "" &&
          formData.dob.day !== "" &&
          formData.dob.month !== "" &&
          formData.dob.year !== ""
        );
      case 1:
        return formData.images.some((img) => img !== null);
      case 2:
        return formData.reason.trim() !== "";
      case 3:
        return formData.interests.length > 0;
      case 4:
        return formData.personality !== "";
    }
  };


  return (
<>
    <FormStartModal />


    
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fd7e14",
        padding: 2,  
        boxSizing: "border-box",  
        flexDirection: "column", 
        "@media (min-width:600px)": { flexDirection: "row" },  
      }}
    >
      

      <Box
        sx={{
          width: "100%",
          maxWidth: "640px",
          height:'90%',  
          textAlign: "center",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,  
          borderRadius: 2,  
          boxShadow: 3, 
          "@media (min-width:600px)": {
            padding: 3, 
            borderRadius: 3, 
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          {step === 0 && <UserForm formData={formData} setFormData={setFormData} />}
          {step === 1 && <ImagePickerCard formData={formData} setFormData={setFormData} />}
          {step === 2 && <Reason formData={formData} setFormData={setFormData} />}
          {step === 3 && <Interest formData={formData} setFormData={setFormData} />}
          {step === 4 && <Personality formData={formData} setFormData={setFormData} />}
        </Box>

        <MyStepper
          step={step}
          setStep={setStep}
          validateStep={validateStep}
          handleDone={handleDone}
        />
      </Box>
    </Box>
</>
  )
}
