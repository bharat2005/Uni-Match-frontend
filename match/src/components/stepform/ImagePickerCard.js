import React from "react";
import { Card, CardMedia, CardActionArea, Box, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ImagePickerCard = ({ formData, setFormData }) => {
  function handleImageChange(event, index){
    if (event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      const list = [...formData.images];
      list[index] = imageUrl; 
      setFormData({ ...formData, images: list }); 
    }
  };

  const handleCardClick = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  return (
    <div style={{ paddingLeft: 60, paddingRight: 60, paddingTop: 60 }}>
      <Typography variant="h4" sx={{ marginBottom: '50px' }} gutterBottom>
        Add your best photos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "480px", 
          margin: "auto",
        }}
      >
        {formData.images.map((image, index) => (
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
};

export default ImagePickerCard;