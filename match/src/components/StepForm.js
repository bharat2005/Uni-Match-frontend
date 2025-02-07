import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import MyStepper from "./stepform/MyStepper";
import UserForm from "./stepform/UserForm";
import ImagePickerCard from "./stepform/ImagePickerCard";
import Reason from "./stepform/Reason";
import Interest from "./stepform/Interest";
import Personality from "./stepform/Personality";
import Dashboard from "./Dashboard";

export default function StepForm() {
  const [boolo, setBoolo] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    images: Array(6).fill(null),
    reason: "",
    selectedInterests: [],
    personality: "",
  });

  const [openModal, setOpenModal] = useState(true);

  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Validation function to check if required fields are filled
  const validateStep = () => {
    switch (step) {
      case 0: // Validate UserForm
        return (
          formData.name.trim() !== "" &&
          formData.gender !== "" &&
          formData.dob.day !== "" &&
          formData.dob.month !== "" &&
          formData.dob.year !== ""
        );
      case 1: // Validate ImagePickerCard
        return formData.images.some((img) => img !== null); // At least one image should be selected
      case 2: // Validate Reason
        return formData.reason.trim() !== "";
      case 3: // Validate Interest
        return formData.selectedInterests.length > 0;
      case 4: // Validate Personality
        return formData.personality !== "";
      default:
        return false;
    }
  };

  if (boolo) {
    return <Dashboard />;
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
      {/* Modal - Displaying introductory message */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "12%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
            Let’s Set You Up!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center" }}>
            <br/>We’re excited to help you find meaningful connections!<br />
            <br />
            <strong>Reminder:</strong> The details you provide here will be used
            to create your profile and will help us recommend the perfect matches
            for you. 🌈<br />
            <br />
            Please fill them out truthfully! 💛<br />
            <br />
          </Typography>
          <Button
            mt={5}
            variant="contained"
            onClick={handleModalClose}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Let's go
          </Button>
        </Box>
      </Modal>

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

        {/* Pass validation function to Stepper */}
        <MyStepper step={step} setStep={setStep} setBoolo={setBoolo} validateStep={validateStep} />
      </Box>
    </Box>
  );
}
