import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

export default function StyledTextArea() {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 9, width: "100%", maxWidth: 500, justifyContent:'center', alignItems:'center' }}>
        <Typography variant="h5">Bio</Typography>
      <TextField
        value={text}
        onChange={handleChange}
        multiline
        rows={6}  // Fixed height for the text area
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: "12px", // Rounded corners
          backgroundColor: "#fff",  // White background
          padding: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px", // Rounded corners for the input itself
            border: "1px solid black", // Light border color
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px", // Padding for internal text area
            color: "black", // Text color
          },
          "&:hover .MuiOutlinedInput-root": {
            borderColor: "black", // Border color on hover (blue)
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: "black", // Change border color to black when focused
            boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.2)", // Optional: remove the default blue shadow
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Ensure the outline is also black when focused
          },
        }}
      />
    </Box>
  );
}
