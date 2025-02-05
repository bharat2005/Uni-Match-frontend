import React, { useState } from "react";
import { Box, Typography } from "@mui/material";


const array = [
  '/pets/dogs.png',
  '/pets/cats.png',
  '/pets/other.png',
]

export default function Pets() {
  const [selected, setSelected] = useState(1); // Default selected box

  return (
            <div style={{ paddingTop: 60 , paddingLeft:60, paddingRight:60}}>
              <Typography variant="h4" gutterBottom>
              Do you like pets?
              </Typography>
    <Box display="flex" sx={{flexDirection:'row', alignItems:'center'}} justifyContent="center" gap={2} mt={5}>

      {array.map((item,index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
          sx={{
            width: selected === index ? 210 : 200,
            height: selected === index ? 190 : 180,
            backgroundImage: `url(${item})`, // Ensure correct image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            marginTop:8,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            borderRadius: 2,
            border: selected ===index? "1.5px solid black" : "1px solid black", // Outline effect
            boxShadow: selected === index ? "0px 0px 10px black" : "none", // Slight glow effect
          }}
        >
        </Box>
      ))}
    </Box>
    </div>
  );
}