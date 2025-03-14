"use client";
import * as React from "react";
import { useState, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function GenderSelectionForm({setStep,formData, setFormData, images, setImages}) {
  const fileInputRefs = useRef([]);

  
  if (fileInputRefs.current.length !== 6) {
    fileInputRefs.current = Array(6)
      .fill()
      .map(() => React.createRef());
  }

  const handleImageSelect = (index, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newtempImages = [...formData['images']];
      newtempImages[index] = {filename:file.name, filetype:file.type};
      setFormData( prev => ({...prev, images: newtempImages}))

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images];
        newImages[index] = e.target.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index, event) => {
    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    
    const newtempImages = [...formData['images']];
    newtempImages[index] = null;
    setFormData(prev => ({...prev, images: newtempImages}))
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].current.value = "";
    }
  };

  return (

      <Box
        maxWidth="md"
        sx={{
          marginTop: "5%",
           padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 24,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Add your photos
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            color: "#666",
            textAlign: "center",
          }}
        >
          You can upload up to 6 photos
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            margin: "30px 0 40px 0",
            gap: { xs: 1.25, sm: 2.5 },
            
  
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => fileInputRefs.current[index].current.click()}
              sx={{
                width: "75%",
                aspectRatio: "0.8",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin:"auto",
                position: "relative",
                border: "2px dashed #ff97b5",
                backgroundColor: "#fff",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#fff5f8",
                },
                outline: "none",  
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
              tabIndex={-1}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRefs.current[index]}
                onChange={(e) => handleImageSelect(index, e)}
                style={{ display: "none",
                 }}
              />

              {image ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Button
                    onClick={(e) => handleRemoveImage(index, e)}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      minWidth: "auto",
                      padding: "4px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 20, color: "#FF4D4D" }} />
                  </Button>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{
                      fontSize: 40,
                      color: "#FFD6E7",
                    }}
                  />
 
                </Box>
              )}
            </Box>
          ))}


          
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', paddingTop:'0px'}}>
                  <Button
                  disabled={!formData['images'].some(img => img !== null)}
                  onClick={()=>setStep(2)} 
                   sx={{
              color: "white !important",
              padding: "12px 0",
              width: "80%",
              maxWidth: "300px",
              borderRadius: "25px",
              fontSize: { xs: "14px", sm: "16px" },
              textTransform: "none",
              backgroundColor: formData['images'].some(img => img !== null)? "#ff69b4" : "#fed8e6",
              "&:hover": {
                backgroundColor: formData['images'].some(img => img !== null)? "#ff69b4" : "#fed8e6",
              },
            }}>Save & Next</Button>
            </Box>

      </Box>
    
  );
}

export default GenderSelectionForm;
