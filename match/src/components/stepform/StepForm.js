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
    dob:{day:'',month:'',year:''},
    age: "",
    images: [null,null,null,null,null,null],
    reason: "",
    interests:[],
    personality:'',
  });
  const [bool,setBool] = useState(false)


function handleDone(){
  axios.post('http://127.0.0.1:5000/profile', formData)
  .then(responce => {
    console.log("Message from server: ", responce)
  })
  .catch(error => {
    console.error("Error: ", error)
  })
}

 
  function validateStep(){
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
 if (bool){
  return <Dashboard/>
 }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffbf00",
      }}
    >
      
     <FormStartModal />

      <Box
        sx={{
          width: "640px",
          height: "100%",
          textAlign: "center",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {step === 0 && <UserForm formData={formData} setFormData={setFormData} />}
          {step === 1 && <ImagePickerCard formData={formData} setFormData={setFormData} />}
          {step === 2 && <Reason formData={formData} setFormData={setFormData} />}
          {step === 3 && <Interest formData={formData} setFormData={setFormData} />}
          {step === 4 && <Personality formData={formData} setFormData={setFormData} />}
        </Box>

        <MyStepper step={step} setStep={setStep} validateStep={validateStep} handleDone={handleDone} bool={bool} setBool={setBool}/>

      </Box>
    </Box>
  );
}