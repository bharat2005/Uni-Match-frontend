import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

export default function StarSign() {
  const [selected, setSelected] = useState(1); // Default selected box

  return (
    <Box display="flex" sx={{flexDirection:'row', alignItems:'center', flexWrap:'wrap'}} justifyContent="center" gap={2} mt={5}>
      {[...Array(12)].map((item,index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
          sx={{
            width: selected === index ? 130: 120,
            height: selected === index ? 130 : 120,
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