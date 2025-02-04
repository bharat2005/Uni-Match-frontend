import React, { useState } from "react";
import { Card, CardMedia, CardActionArea, Typography, Box } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function ImagePickerCard() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Trigger File Input on Card Click
  const handleCardClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <Card 
      sx={{
        width: 400,
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed gray",
        cursor: "pointer",
        "&:hover": { borderColor: "blue" },
      }}
      onClick={handleCardClick}
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <CardActionArea>
        {selectedImage ? (
          <CardMedia
            component="img"
            image={selectedImage}
            alt="Selected"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box textAlign="center">
            <Typography variant="body2" sx={{color:'black'}}>
            <AddAPhotoIcon/>
            </Typography>
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
}
