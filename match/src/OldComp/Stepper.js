import React from "react";
import { MobileStepper } from "@mui/material";

export default function MyStepper({ step }) {
  return (
<MobileStepper
  sx={{
    "&.MuiPaper-root": { // Target the Paper wrapper directly
      backgroundColor: "transparent", // Remove default Paper background
      boxShadow: "none", // Remove Paper shadow if present
      padding: "0px", // Remove default padding
    },
    "& .MuiLinearProgress-root": {
      backgroundColor: "lightgrey",
      "& .MuiLinearProgress-bar": {
        backgroundImage: "linear-gradient(90deg, #ff69b4, #8b5cf6)",
      },
    },
    width: "100%", // Let it fill the parent width naturally
  }}
  variant="progress"
  steps={8}
  position="static"
  activeStep={step}
/>

  );
}
