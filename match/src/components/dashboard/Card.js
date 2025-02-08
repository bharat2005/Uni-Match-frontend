import React, { useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";




export default function Card({ profile,lastDirection }){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === profile.images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? profile.images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <Box
        sx={{
          position: "relative",
          backgroundColor: "black",
          width: "350px",
          height: "500px",
          boxShadow: "inset 0px -80px 40px 0px black",
          borderRadius: "8px",
          backgroundImage: `url(${profile.images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Left Arrow Button */}
        <IconButton
          sx={{ position: "absolute", left: "10px", color: "white" }}
          onClick={prevImage}
        >
          <ArrowBackIos />
        </IconButton>
  
        {/* Right Arrow Button */}
        <IconButton
          sx={{ position: "absolute", right: "10px", color: "white" }}
          onClick={nextImage}
        >
          <ArrowForwardIos />
        </IconButton>


        {lastDirection && (
            <Box
            sx={{
            position: "absolute",
            top: "30%",
            opacity:1,
            transition: "opacity 0.5s ease-in-out",
                  
        }}
                >
                  <img
                  draggable='false'
                    src={lastDirection === "left" ? "/cross.png" : "/accept.png" }
                    style={{ width: "200px" }}
                  />
                </Box>
              )}
  
        {/* User Info */}
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
          {profile.reason}
        </Typography>
      </Box>
    );
  };