import React from "react";
import { Box, Typography } from "@mui/material";

const array = [
  '/reason/cd.png',
  '/reason/stf.png',
  '/reason/ltr.png',
  '/reason/nf.png',
  '/reason/sb.png',
  '/reason/sf.png',
];

export default function Reason({ formData, setFormData }) {
  const [selected, setSelected] = React.useState(0);

  const handleSelection = (index) => {
    setSelected(index);
    const selectedReason = array[index];
    setFormData((prevState) => ({ ...prevState, reason: selectedReason }));
  };

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
        {array.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSelection(index)}
            sx={{
              width: 150, 
              height: 150, 
              backgroundImage: `url(${item})`,
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
