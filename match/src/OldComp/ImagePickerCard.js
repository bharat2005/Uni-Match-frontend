import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";

export default function ImagePickerCard({ formData, setFormData }) {
  const [uploading, setUploading] = useState([false, false, false, false]);

  const handleImageChange = (event, index) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = file.name;
      const contentType = file.type;

      const updatedUploading = [...uploading];
      updatedUploading[index] = true;
      setUploading(updatedUploading);

      axios
        .post("https://api.uni-match.in/get_presigned_url", {
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
              const s3Url = presignedUrl.split("?")[0];
              const updatedImages = [...formData.images];
              updatedImages[index] = s3Url;
              setFormData({ ...formData, images: updatedImages });

              updatedUploading[index] = false;
              setUploading(updatedUploading);
            })
            .catch((error) => {
              console.error("Error uploading the image", error);

              updatedUploading[index] = false;
              setUploading(updatedUploading);
            });
        })
        .catch((error) => {
          console.error("Error getting presigned URL", error);

          updatedUploading[index] = false;
          setUploading(updatedUploading);
        });
    }
  };

  const handleCardClick = (index) => {
    document.getElementById(`fileInput-${index}`).click();
  };

  return (
    <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "40px", fontSize: { xs: "1.5rem", sm: "1.75rem" } }}
        gutterBottom
      >
        Add your best photos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "20px",
          justifyItems: "center",
          alignItems: "center",
          columnGap: "20px",
          width: "100%",
          margin: "auto",
        }}
      >
        {formData.images.map((image, index) => (
          <Card
            key={index}
            sx={{
              width: "100%",
              maxWidth: "120px",
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed gray",
              cursor: "pointer",
              backgroundImage: image ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
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
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <CircularProgress size={30} sx={{ color: "black" }} />
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
                    <AddAPhotoIcon sx={{ fontSize: 30, color: "grey" }} />
                  </Box>
                )
              )}
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );
}
