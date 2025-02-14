import React, { useState } from "react";
import { MobileStepper, Button, Modal, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneIcon from "@mui/icons-material/Done";
import ErrorModal from './ErrorModal';
import DoneModal from './DoneModal';

export default function MyStepper({ step, setStep, validateStep, handleDone}) {
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
      handleDone();
      setDoneOpen(true); 
    }
  }

  return (
    <>
      <ErrorModal errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
      <DoneModal doneOpen={doneOpen} />

      <MobileStepper
        sx={{
          "& .MuiLinearProgress-root": {
            backgroundColor: "lightgrey",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
              marginBottom: "0px",
            },
          },
          maxWidth: "100%",
          padding: { xs: "0 10px", sm: "0 20px" },
        }}
        variant="progress"
        steps={5}
        position="static"
        activeStep={step}
        nextButton={
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "50px",
              '&:hover':{backgroundColor:'black'},
              boxShadow: "none",
              padding: { xs: "8px", sm: "12px" },
              minWidth: { xs: "40px", sm: "50px" },
              height: { xs: "40px", sm: "50px" },
            }}
            size="small"
            onClick={handleNextClick}
          >
            {step === 4 ? (
              <DoneIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
            ) : (
              <ArrowForwardIosIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
            )}
          </Button>
        }
        backButton={
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "black",
              borderRadius: "50px",
              boxShadow: "none",
              padding: { xs: "8px", sm: "12px" }, 
              minWidth: { xs: "40px", sm: "50px" }, 
              height: { xs: "40px", sm: "50px" },
              "&:hover": { backgroundColor: step===0?"":"black" }
            }}
            size="small"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={step === 0}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
          </Button>
        }
      />
    </>
  );
}
