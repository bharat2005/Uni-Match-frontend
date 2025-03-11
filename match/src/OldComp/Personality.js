import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const array = [
  '/personality/extrovert.png',
  '/personality/introvert.png',
];
const personalities = [
  'extrovert',
  'introvert',
];



export default function Personality({ setFormData }) {
  const [selected, setSelected] = useState(0);

  function handleClick(index) {
    setSelected(index);
    const per = personalities[index];
    setFormData(prev => {
      return { ...prev, personality: per };
    });
  }

  return (
    <div style={{ paddingTop: 40 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem" }}} 
      >
        Are you an introvert or extrovert?
      </Typography>

      <Box 
        display="flex" 
        sx={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: "center",
          justifyContent: 'center',
          gap: 2,
          mt: 4
        }}>
        {array.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleClick(index)}
            sx={{
              width: selected === index ? "50px" : "60px",
              height: selected === index ? "50px" : "60px",
              backgroundImage: `url(${item})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 2,
              border: selected === index ? "2.5px solid black" : "1px solid black",
              transition: "transform 0.3s, border 0.3s",
              "&:hover": {
                transform: "scale(1.05)", 
              },
              "@media (max-width:600px)": {
                width: "150px",
                height: "150px",
              }
            }}
          >
            <img
              src={item}
              alt={personalities[index]} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}
