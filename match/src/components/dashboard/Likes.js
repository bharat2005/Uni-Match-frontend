import React, { useState } from "react";
import { Box, Typography } from "@mui/material";


export default function Likes(){
    return (
        <Box  sx={{
            position: "relative",
            width: "640px",
            height: "100%", 
            overflow: "visible",
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center',
            display:'flex'
          }}>
            <Typography variant="h4">Likes Comming soon!</Typography>
        </Box>
    )
}