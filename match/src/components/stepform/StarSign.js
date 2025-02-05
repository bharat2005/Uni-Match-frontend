import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const array = [
  '/starsigns/aries.png',
  '/starsigns/taurus.png',
  '/starsigns/gemini.png',
  '/starsigns/cancer.png',
  '/starsigns/leo.png',
  '/starsigns/virgo.png',
  '/starsigns/libra.png',
  '/starsigns/scorpio.png',
  '/starsigns/sag.png',
  '/starsigns/cap.png',
  '/starsigns/aqua.png',
  '/starsigns/pic.png',
]

export default function StarSign() {
  const [selected, setSelected] = useState(1); // Default selected box

  return (
     <div style={{ paddingTop: 60 , backgroundColor:'white', paddingLeft:60, paddingRight:60}}>
          <Typography variant="h4" gutterBottom>
            What is your Star-sign?
          </Typography>
    <Box display="flex" sx={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}} justifyContent="center" gap={2} mt={5}>
      {array.map((item,index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
          sx={{
            width: selected === index ? 130 : 120,
            height: selected === index ? 130 : 120,
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
        >
        </Box>
      ))}
    </Box>
    </div>
  );
}