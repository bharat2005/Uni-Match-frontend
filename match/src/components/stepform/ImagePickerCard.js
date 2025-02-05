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

<div style={{ paddingTop:60,paddingLeft:60,paddingRight:60 }}>
        <Typography variant="h4" gutterBottom>
          Add your best photo
        </Typography>

    <Card 
      sx={{
        marginLeft:'60px',
        marginRight:'60px',
        marginTop:'40px',
        width: 400,
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed gray",
        cursor: "pointer",
        "&:hover": { borderColor: "black" },
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
            <AddAPhotoIcon/>
          </Box>
        )}
      </CardActionArea>



    </Card>
    </div>
  );
}
