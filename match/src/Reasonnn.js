"use client";
import * as React from "react";
import { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const images = [
  { id: 1, url: "URL_IMAGE1", label: "Image 1" },
  { id: 2, url: "URL_IMAGE2", label: "Image 2" },
  { id: 3, url: "URL_IMAGE3", label: "Image 3" },
  { id: 4, url: "URL_IMAGE4", label: "Image 4" },
  { id: 5, url: "URL_IMAGE5", label: "Image 5" },
  { id: 6, url: "URL_IMAGE6", label: "Image 6" },
];

function GenderSelectionForm() {
  const [selectedImage, setSelectedImage] = useState(null);

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
          选择你喜欢的图片
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          确认后无法修改
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
          {images.map((image) => (
            <Box
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
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
                border:
                  selectedImage === image.id
                    ? "2px solid #ff97b5"
                    : "2px solid transparent",
                backgroundColor: "#fff",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {image.label}
              </Typography>
              {selectedImage === image.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#ff97b5",
                  }}
                />
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
