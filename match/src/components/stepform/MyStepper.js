import React, { useState } from "react";
import { MobileStepper, Button, Modal, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";
import ErrorModal from './ErrorModal';
import DoneModal from './DoneModal';

export default function MyStepper({ step, setStep, validateStep, handleDone, bool, setBool }) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);

  function handleNextClick() {
    if (step < 4) {
      if (validateStep()) {
        setStep((prev) => prev + 1);
      } else {
        setErrorOpen(true); 
      }
    } else {
      handleDone()
      setDoneOpen(true); 
    }
  }

  return (
    <>
    <ErrorModal errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
     
    <DoneModal doneOpen={doneOpen} bool={bool} setBool={setBool}/>


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
