import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const imagePaths = [
  '/reason/cd.png',
  '/reason/stf.png',
  '/reason/ltr.png',
  '/reason/nf.png',
  '/reason/sb.png',
  '/reason/sf.png',
];

const reasons = [
  "Casual Dating",
  "Short-term fun", 
  "Long-term relationship", 
  "New friends",  
  "Study buddy",  
  "Still figuring it out", 
];

export default function Reason({ setFormData }) {
  const [selected, setSelected] = useState(0);

  function handleSelection(index) {
    setSelected(index);
    const selectedReason = reasons[index]; 
    setFormData((prev) => ({ ...prev, reason: selectedReason }));
  }

  return (
    <div style={{ paddingTop: 40, backgroundColor: 'white' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, textAlign: "center" }}
      >
        What are you looking for?
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 }, 
          marginTop: { xs: 4, sm: 6 }, 
        }}
      >
        {imagePaths.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSelection(index)}
            sx={{
              width: { xs: 120, sm: 150 }, 
              height: { xs: 120, sm: 150 }, 
              backgroundImage: `url(${imagePaths[index]})`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 2,
              border: selected === index ? "2px solid black" : "1px solid black",
              transform: selected === index ? "scale(1.05)" : "scale(1)",
              position: "relative",
              transition: "transform 0.2s ease, border 0.2s ease",
            }}
          >
          </Box>
        ))}
      </Box>
    </div>
  );
}
