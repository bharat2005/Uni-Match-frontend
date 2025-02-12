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
import Dashboard from '../dashboard/Dashboard'

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
    axios.post('http://127.0.0.1:5000/profile', formData)
      .then(response => {
        console.log("Message from server: ", response);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffbf00",
        padding: 2,  // Added padding to avoid edge-to-edge content on mobile
        boxSizing: "border-box",  // To ensure the padding is included in the width
        flexDirection: "column", // Stack items vertically on smaller screens
        "@media (min-width:600px)": { flexDirection: "row" },  // Use row layout on larger screens
      }}
    >
      <FormStartModal />

      <Box
        sx={{
          width: "100%",
          maxWidth: "640px",
          height:'90%',  // Limit max width for larger screens
          textAlign: "center",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,  // Added padding to keep content away from edges
          borderRadius: 2,  // Rounded corners for a softer look
          boxShadow: 3,  // Add shadow for contrast
          "@media (min-width:600px)": {
            padding: 3,  // More padding on larger screens
            borderRadius: 3,  // Larger border radius for bigger screens
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
  );
}
