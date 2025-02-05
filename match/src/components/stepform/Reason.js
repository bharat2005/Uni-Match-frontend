import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

let array = [
  '/reason/cd.png',
  '/reason/stf.png',
  '/reason/ltr.png',
  '/reason/nf.png',
  '/reason/sb.png',
  '/reason/sf.png',
]

export default function Reason() {
  const [selected, setSelected] = useState(1); // Default selected box

  return (
    <div style={{ paddingTop: 60 , backgroundColor:'white'}}>
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
        gap={2}
        mt={6}
      >
        {array.map((item, index) => (
          <Box
            key={index}
            onClick={() => setSelected(index)}
            sx={{
              width: selected === index ? 170 : 160,
              height: selected === index ? 190 : 180,
              backgroundImage: `url(${item})`, // Ensure correct image path
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              borderRadius: 2,
              border: selected ===index? "1.5px solid black" : "1px solid black", // Outline effect
              boxShadow: selected === index ? "0px 0px 10px black" : "none", // Slight glow effect
            }}
          ></Box>
        ))}
      </Box>
    </div>
  );
}
