import React, { useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Card({ profile, setImageClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const list = profile.images.filter(item => item != null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
  };

  function emoji() {
    switch (profile.reason) {
      case "Casual Dating":
        return "🎉";
      case "Short-term fun":
        return "😍";
      case "Long-term relationship":
        return "💘";
      case "New friends":
        return "👋";
      case "Study buddy":
        return "📚";
      case "Still figuring it out":
        return "🤔";
      default:
        return "";
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "white",
        width: "380px",
        height: "540px",
        boxShadow: "inset 0px -50px 30px 0px black",
        borderRadius: "34px",
        backgroundImage: `url(${list[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left Arrow Button */}
      <IconButton
        sx={{
          position: "absolute",
          left: "10px",
          color: "white",
          padding: "16px", // Increases clickable area
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Optional hover effect
          },
        }}
        onPointerDown={prevImage}
        disableRipple // Disable ripple effect
      >
        <ArrowBackIos style={{ visibility: 'hidden' }} />
      </IconButton>

      {/* Right Arrow Button */}
      <IconButton
        sx={{
          position: "absolute",
          right: "10px",
          color: "white",
          padding: "16px", // Increases clickable area
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)", // Optional hover effect
          },
        }}
        onPointerDown={nextImage}
        disableRipple // Disable ripple effect
      >
        <ArrowForwardIos style={{ visibility: 'hidden' }} />
      </IconButton>

      {/* Up Arrow Button */}
      <IconButton
      onPointerDown={()=> {setImageClick(true)}}
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          padding: "12px",
          borderRadius: "50%", // Circular button
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker on hover
          },
        }}
      >
        <i className="ti ti-arrow-up" style={{ fontSize: "24px" }}></i> {/* Tabler Up Arrow Icon */}
      </IconButton>

      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          bottom: "46px",
          left: "24px",
          fontWeight: "bold",
          fontSize: "38px",
          color: "white",
        }}
      >
        {profile.name}, {profile.age}
      </Typography>
    </Box>
  );
}
