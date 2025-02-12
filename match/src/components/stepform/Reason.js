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
          gap: { xs: 2, sm: 3 }, // Adjust gap for mobile
          marginTop: { xs: 4, sm: 6 }, // Adjust margin for better spacing on smaller screens
        }}
      >
        {imagePaths.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSelection(index)}
            sx={{
              width: { xs: 120, sm: 150 },  // Adjust width based on screen size
              height: { xs: 120, sm: 150 }, // Adjust height for better visibility
              backgroundImage: `url(${imagePaths[index]})`, // Background image from imagePaths array
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
              position: "relative", // For absolute text positioning
              transition: "transform 0.2s ease, border 0.2s ease", // Smooth transition for scale and border
            }}
          >
          </Box>
        ))}
      </Box>
    </div>
  );
}
