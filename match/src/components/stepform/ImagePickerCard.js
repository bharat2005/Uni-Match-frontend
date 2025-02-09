import React, { useState } from "react";
import { Card, CardMedia, CardActionArea, Box, Typography, CircularProgress } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from "axios";

export default function ImagePickerCard({ formData, setFormData }){
  const [uploading, setUploading] = useState(Array(formData.images.length).fill(false));

  const handleImageChange = (event, index) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = file.name;
      const contentType = file.type;

  
      const updatedUploading = [...uploading];
      updatedUploading[index] = true;
      setUploading(updatedUploading);

      axios
        .post("http://localhost:5000/get_presigned_url", {
          file_name: fileName,
          content_type: contentType,
        })
        .then((response) => {
          const presignedUrl = response.data.url;

          axios
            .put(presignedUrl, file, {
              headers: {
                "Content-Type": contentType,
              },
            })
            .then(() => {
              const s3Url = presignedUrl.split("?")[0];  // Get the S3 URL without query parameters
              const updatedImages = [...formData.images];
              updatedImages[index] = s3Url;  // Update the image URL in the formData
              setFormData({ ...formData, images: updatedImages });

              // Set uploading state to false for the specific index after upload
              updatedUploading[index] = false;
              setUploading(updatedUploading);
            })
            .catch((error) => {
              console.error("Error uploading the image", error);

              // Set uploading state to false if there was an error
              updatedUploading[index] = false;
              setUploading(updatedUploading);
            });
        })
        .catch((error) => {
          console.error("Error getting presigned URL", error);
          
          // Set uploading state to false if there was an error
          updatedUploading[index] = false;
          setUploading(updatedUploading);
        });
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
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
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

            <CardActionArea sx={{ width: "100%", height: "100%" }}>
              {uploading[index] ? (
                // Show loading spinner while uploading
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent overlay
                  }}
                >
                  <CircularProgress size={30} sx={{ color: 'black', }}/>
                </Box>
              ) : (
                !image && (
                  <Box
                    textAlign="center"
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddAPhotoIcon sx={{ fontSize: 35, color: "grey" }} />
                  </Box>
                )
              )}
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );
};

