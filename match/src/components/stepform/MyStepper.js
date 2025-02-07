import React, { useState } from "react";
import { MobileStepper, Button, Modal, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";

export default function MyStepper({ step, setStep, setBoolo, validateStep }) {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  function handleNextClick() {
    if (step < 4) {
      if (validateStep()) {
        setStep((prev) => prev + 1);
      } else {
        setErrorModalOpen(true); // Open error modal if validation fails
      }
    } else {
      setSuccessModalOpen(true); // Open success modal on profile completion
    }
  }

  return (
    <>
      {/* ❌ Validation Error Modal */}
      <Modal open={errorModalOpen} onClose={() => setErrorModalOpen(false)}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "20%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "red" }}>
            ⚠️ Missing Information!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Please fill in all required details before proceeding!
          </Typography>
          <Button
            variant="contained"
            onClick={() => setErrorModalOpen(false)}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Okay
          </Button>
        </Box>
      </Modal>

      {/* ✅ Success Modal */}
      <Modal open={successModalOpen} onClose={() => setBoolo(true)}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "15%",
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2, color: "green" }}>
            🎉 Profile Created Successfully!
          </Typography>
          <Typography>
            <br/>
            Your profile is ready, and you're all set to begin your journey!<br/><br/>
            Welcome to the community! 🌟<br/><br/>

          </Typography>
          <Button
            variant="contained"
            onClick={() => setBoolo(true)}
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#ffbf00",
              color: "black",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#ffbf00" },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Modal>

      {/* 🔄 Stepper Navigation */}
      <MobileStepper
        sx={{
          "& .MuiLinearProgress-root": {
            backgroundColor: "#ffbf00",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
              marginBottom: "0px",
            },
          },
        }}
        variant="progress"
        steps={5}
        position="static"
        activeStep={step}
        nextButton={
          <Button
            variant="contained"
            sx={{
              color: "#ffbf00",
              backgroundColor: "black",
              borderRadius: "50px",
              boxShadow: "none",
              "&:hover": { backgroundColor: "black" },
            }}
            size="small"
            onClick={handleNextClick}
          >
            {step === 4 ? <DoneIcon /> : <ArrowForwardIosIcon />}
          </Button>
        }
        backButton={
          <Button
            variant="contained"
            sx={{
              color: "#ffbf00",
              backgroundColor: "black",
              borderRadius: "50px",
              boxShadow: "none",
              "&:hover": { backgroundColor: "black" },
            }}
            size="small"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 0}
          >
            <ArrowBackIosNewIcon />
          </Button>
        }
      />
    </>
  );
}
