"use client";
import * as React from "react";
import { useState, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function GenderSelectionForm() {
  const [images, setImages] = useState(Array(6).fill(null));
  const fileInputRefs = useRef([]);

  // Initialize refs array
  if (fileInputRefs.current.length !== 6) {
    fileInputRefs.current = Array(6)
      .fill()
      .map(() => React.createRef());
  }

  const handleImageSelect = (index, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
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
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].current.value = "";
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: '"Noto Sans SC", sans-serif',
      }}
    >
      <Button
        startIcon={<ChevronLeftIcon />}
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          color: "#000",
          minWidth: "auto",
          padding: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          marginTop: "60px",
          padding: "20px",
          "@media (max-width: 640px)": {
            padding: "10px",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "24px",
            fontWeight: 500,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          上传你的照片
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          请选择6张你的照片
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "60px",
            "@media (max-width: 640px)": {
              gap: "10px",
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => fileInputRefs.current[index].current.click()}
              sx={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                border: "2px dashed #ff97b5",
                backgroundColor: "#fff",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#fff5f8",
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRefs.current[index]}
                onChange={(e) => handleImageSelect(index, e)}
                style={{ display: "none" }}
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
                    <DeleteIcon sx={{ fontSize: 20, color: "#ff6b98" }} />
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
                      color: "#ff97b5",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    点击上传
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ marginTop: "auto" }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "8px",
            }}
          >
            基础资料(2/14)
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#e0e0e0",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "14%",
                height: "100%",
                background: "linear-gradient(90deg, #ff97b5, #ff6b98)",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#666",
              marginTop: "12px",
            }}
          >
            为打造100%真实的交友平台，请如实填写资料，不真实的资料审核时将会被拒绝。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default GenderSelectionForm;
