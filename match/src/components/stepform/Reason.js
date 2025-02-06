import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const array = [
  '/reason/cd.png',
  '/reason/stf.png',
  '/reason/ltr.png',
  '/reason/nf.png',
  '/reason/sb.png',
  '/reason/sf.png',
];

export default function Reason() {
  const [selected, setSelected] = useState(1); // Default selected box

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
        gap={2}
        mt={6}
      >
        {array.map((item, index) => (
          <Box
            key={index}
            onClick={() => setSelected(index)}
            sx={{
              width: 150,  // Fixed width to prevent displacement
              height: 150, // Fixed height to prevent displacement
              backgroundImage: `url(${item})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 2,
              border: selected === index ? "2px solid black" : "1px solid black", // Highlight effect without resizing
              //boxShadow: selected === index ? "0px 4px 10px rgba(0,0,0,0.3)" : "none", // Glow effect without shifting
              transform: selected === index ? "scale(1.05)" : "scale(1)", // Slight zoom effect without displacement
            }}
          ></Box>
        ))}
      </Box>
    </div>
  );
}
