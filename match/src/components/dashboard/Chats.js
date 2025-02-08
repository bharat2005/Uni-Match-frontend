import React, { useState } from "react";
import { Box, Typography } from "@mui/material";


export default function Likes(){
    return (
        <Box sx={{
            height: "95%",
            bgcolor: "background.paper",
            boxShadow: 2,
            width:'500px',
            p: 2,
           // maxHeight: 400,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for Webkit browsers
            },
            msOverflowStyle: "none", // Hide scrollbar for IE and Edge
            scrollbarWidth: "none", // Hide scrollbar for Firefox
          }}>
          <Typography variant="h4">Chats Comming soon!</Typography>
        </Box>
    )
}