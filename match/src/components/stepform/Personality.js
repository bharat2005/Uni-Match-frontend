import React, { useState } from "react";
import { Box, Typography } from "@mui/material";


const array =[
'/personality/extrovert.png',
'/personality/introvert.png',

]


export default function Personality() {
  const [selected, setSelected] = useState(0);

  return (
        <div style={{ paddingTop: 60 , paddingLeft:60, paddingRight:60}}>
          <Typography variant="h4" gutterBottom>
          Are you an introvert or extrovert?
          </Typography>

    <Box display="flex" sx={{flexDirection:'row', alignItems:'center'}} justifyContent="center" gap={2} mt={5}>
      {array.map((item,index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
            sx={{
              width: selected === index ? 240 : 230,
              height: selected === index ? 240 : 230,
              backgroundImage: `url(${item})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              marginTop:8,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 2,
              border: selected ===index? "2.5px solid black" : "1px solid black",
            }}
        >
        </Box>
      ))}
    </Box>
    </div>
  );
}