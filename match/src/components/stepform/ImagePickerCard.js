import React, { useState } from "react";
import { Card, CardMedia, CardActionArea, Typography, Box } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function ImagePickerCard() {
  const [images, setImages] = useState(Array(6).fill(null)); // Array for 6 images

  // Handle Image Selection
  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImages = [...images];
      newImages[index] = imageUrl;
      setImages(newImages);
    }
  };

  // Trigger File Input on Card Click
  const handleCardClick = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  return (
    <div style={{ paddingLeft: 60, paddingRight: 60, paddingTop: 60 }}>
      <Typography variant="h4" sx={{marginBottom:'50px'}} gutterBottom>
        Add your best photos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", // Auto-fill keeps it responsive
          gap: "30px", // Controls spacing between boxes (reducing row gap)
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "480px", // Ensures it doesn't stretch too wide
          margin: "auto",
        }}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            sx={{
              width: 140,
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed gray",
              cursor: "pointer",
              "&:hover": { borderColor: "black" },
            }}
            onClick={() => handleCardClick(index)}
          >
            <input
              id={`fileInput-${index}`}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e, index)}
            />

            <CardActionArea>
              {image ? (
                <CardMedia
                  component="img"
                  image={image}
                  alt="Selected"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box textAlign="center">
                  <AddAPhotoIcon />
                </Box>
              )}
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );
}
