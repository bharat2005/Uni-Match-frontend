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
    const selectedReason = reasons[index]; // Get the corresponding string for the selected image
    setFormData((prev) => ({ ...prev, reason: selectedReason })); // Store the selected string in formData
  }

  return (
    <div style={{ paddingTop: 60, backgroundColor: 'white' }}>
      <Typography variant="h4" gutterBottom>
        What are you looking for?
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        justifyContent="center"
        gap={3}
        mt={6}
      >
        {imagePaths.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSelection(index)}
            sx={{
              width: 150,
              height: 150,
              backgroundImage: `url(${item})`, // Background image from imagePaths array
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
            }}
          ></Box>
        ))}
      </Box>
    </div>
  );
}
