import React, { useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";


export default function Card({ profile, lastDirection }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const list = profile.images.filter(item => item!=null)

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

  function emoji(){
  switch (profile.reason){
    case "Casual Dating":
      return "🎉"
    case "Short-term fun":
      return "😍"
    case "Long-term relationship":
      return "💘"
    case "New friends":
      return "👋"
    case "Study buddy":
      return "📚"
    case "Still figuring it out":
      return "🤔"
  }}


  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "white",
        border:'4px solid #fd7e14',
        width: "350px",
        height: "500px",
        boxShadow: "inset 0px -80px 40px 0px black",
        borderRadius: "8px",
        backgroundImage: `url(${list[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <IconButton
        sx={{ position: "absolute", left: "10px", color: "white" }}
        onPointerDown={prevImage}
      >
        <ArrowBackIos />
      </IconButton>


      <IconButton
        sx={{ position: "absolute", right: "10px", color: "white" }}
        onPointerDown={nextImage}
      >
        <ArrowForwardIos />
      </IconButton>

    
      {lastDirection && (
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <img
            draggable="false"
            src={lastDirection === "left" ? "/signs/cross.png" : "/signs/accept.png"}
            style={{ width: "300px",opacity:0.5 }}
          />
        </Box>
      )}


      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          bottom: "35px",
          left: "15px",
          fontWeight: "bold",
          fontSize: "25px",
          color: "white",
        }}
      >
        {profile.name}, {profile.age}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          bottom: "15px",
          left: "12px",
          fontSize: "15px",
          color: "white",
        }}
      >
        {emoji()}{profile.reason}
      </Typography>
    </Box>
  );
}