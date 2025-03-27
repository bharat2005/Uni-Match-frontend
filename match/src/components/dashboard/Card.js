import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { createPortal } from "react-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "../../OldComp/Drawer.js";
import SmallLoading from "../login/SmallLoading";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Card({ profile, cardDir, isActive }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const list = profile.images.filter((item) => item != null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <style>
        {`
    @keyframes popUp {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
      
    }
    
    @keyframes fadeIn {
      0% {
        transform: translateY(-20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `}
      </style>

      {isActive && <Outlet context={{ profile }} />}

      <Box
        sx={{
          position: "relative",
          backgroundColor: "white",
          width: "100vw",
          height: "calc(100vh - 108px)",
          boxShadow: "inset 0px -240px 60px 0px black",
          borderRadius: "24px",
          backgroundImage: `url(${list[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: `center bottom 140px`, // Offset from the bottom
          backgroundRepeat: "repeat", // Repeat the image
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", width: "100%", position: "absolute", top: 0 }}
        >
          {cardDir === "left" && (
            <img
              src={"/unlike.svg"}
              style={{
                width: "100%",
                transform: "scale(0.1)", // Start small
                opacity: 0, // Start invisible
                animation: "popUp 0.3s ease forwards",
              }}
            />
          )}
          {cardDir === "right" && (
            <img
              src={"/like.svg"}
              style={{
                width: "100%",
                transform: "scale(0.1)", // Start small
                opacity: 0, // Start invisible
                animation: "popUp 0.3s ease forwards",
              }}
            />
          )}
        </Box>

        {/* Left Arrow */}
        <IconButton
          sx={{
            position: "absolute",
            left: "10px",
            color: "white",
            top: "30%",
            padding: "18px",
          }}
          onPointerDown={prevImage}
          disableRipple
        >
          <ArrowBackIos sx={{ visibility: "hidden" }} />
        </IconButton>

        {/* Right Arrow */}
        <IconButton
          sx={{
            position: "absolute",
            right: "10px",
            top: "30%",
            color: "white",
            padding: "18px",
          }}
          onPointerDown={nextImage}
          disableRipple
        >
          <ArrowForwardIos sx={{ visibility: "hidden" }} />
        </IconButton>

        {/* Open in Modal */}
        <IconButton
          onPointerDown={() => navigate(`/app/home/info`)}
          sx={{
            position: "absolute",
            bottom: "28%",
            right: "8%",
            color: "white",
            backgroundColor: "black",
            padding: "6px",
            borderRadius: "50%",
            border: "1px solid white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <i
            className="ti ti-arrow-big-up-filled"
            style={{ fontSize: "24px" }}
          />
        </IconButton>

        {/* ✅ Dots Indicator */}
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            top: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "8px", // Slightly more space for better clarity
          }}
        >
          {list.map((_, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                height: "6px", // Slightly taller for better visibility
                borderRadius: "10px",
                backgroundColor:
                  index === currentImageIndex
                    ? "white"
                    : "rgba(200, 200, 200, 0.6)",
                opacity: index === currentImageIndex ? 1 : 0.5,
                transition: "all 0.3s ease-in-out",
                transform:
                  index === currentImageIndex ? "scale(1.3)" : "scale(1)", // More noticeable effect
                boxShadow:
                  index === currentImageIndex
                    ? "0px 0px 6px rgba(255, 255, 255, 0.8)"
                    : "none",
              }}
            />
          ))}
        </Box>

        {/* Profile Info */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            bottom: "24%",
            left: "5%",
            fontWeight: "bold",
            fontSize: "38px",
            color: "white",
          }}
        >
          {profile.name}, {profile.age}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            bottom: "22%",
            left: "5%",
            fontWeight: "normal",
            fontSize: "18px",
            color: "white",
          }}
        >
          {profile.reason}
        </Typography>
      </Box>
    </>
  );
}
