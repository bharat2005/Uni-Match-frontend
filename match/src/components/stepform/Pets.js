import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Pets() {
  const [selected, setSelected] = useState(1); // Default selected box

  return (
    <Box display="flex" sx={{flexDirection:'column', alignItems:'center'}} justifyContent="center" gap={2} mt={5}>
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
          sx={{
            width: selected === index ? 230: 210,
            height: selected === index ? 200 : 180,
            backgroundColor: selected === index ? "black" : "#ffbf00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            borderRadius: 2,
          }}
        >
        </Box>
      ))}
    </Box>
  );
}