import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { createPortal } from "react-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "./Drawer";
import SmallLoading from "../login/SmallLoading";
import { useNavigate } from 'react-router-dom';
import ImagePart from "./ImagePart.js";


export default function Card({ profile }) {
  const navigate = useNavigate();
  const [imageClick, setImageClick] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const list = profile.images.filter((item) => item != null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageClick) {
      // Push new state into history when opening drawer
      window.history.pushState({ modalOpen: true }, '');
      
      setTimeout(() => setImageLoaded(true), 10);
  
      // Handle the back button to close the drawer instead of navigating back
      const handlePopState = (event) => {
        if (event.state?.modalOpen) {
          setImageClick(false);
        }
      };
  
      window.addEventListener('popstate', handlePopState);
  
      // Cleanup
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [imageClick]);
  

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1,
    );

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1,
    );
    setImageLoaded(false);
  };

  return (
    <>
      {imageClick &&
        createPortal(
          <ImagePart
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            list={list}
            currentImageIndex={currentImageIndex}
            setImageClick={setImageClick}
            prevImage={prevImage}
            nextImage={nextImage}
          />,
          document.body,
        )}



      <Box
        sx={{
          position: "relative",
          backgroundColor: "white",
          width: "100vw",
          height: "80vh",
          boxShadow: "inset 0px -140px 60px 0px black",
          borderRadius: "24px",
          backgroundImage: `url(${list[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: `center bottom 80px`, // Offset from the bottom
          backgroundRepeat: "repeat", // Repeat the image
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Left Arrow */}
        <IconButton
          sx={{
            position: "absolute",
            left: "10px",
            color: "white",
            padding: "16px",
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
            color: "white",
            padding: "16px",
          }}
          onPointerDown={nextImage}
          disableRipple
        >
          <ArrowForwardIos sx={{ visibility: "hidden" }} />
        </IconButton>

        {/* Open in Modal */}
        <IconButton
          onPointerDown={() => {setImageClick(true);}}
          sx={{
            position: "absolute",
            bottom: "18%",
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
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
          }}
        >
          {list.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: index === currentImageIndex ? "28px" : "18px", // Wider for active
                height: "5px", // Slightly taller for balance
                borderRadius: "12px", // Keep it soft with rounded edges
                backgroundColor:
                  index === currentImageIndex
                    ? "white" // Soft pink for active
                    : "#D3D3D3", // Light gray for inactive
                opacity: index === currentImageIndex ? 1 : 0.5, // Subtle fade for inactive
                transition: "all 0.2s ease",
                transform:
                  index === currentImageIndex ? "scaleX(1.1)" : "scaleX(1)", // Gentle scale for active
              }}
            />
          ))}
        </Box>

        {/* Profile Info */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            bottom: "14%",
            left: "5%",
            fontWeight: "bold",
            fontSize: "34px",
            color: "white",
          }}
        >
          {profile.name}, {profile.age}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            bottom: "12%",
            left: "5%",
            fontWeight: "normal",
            fontSize: "16px",
            color: "white",
          }}
        >
          {profile.reason}
        </Typography>

        <Drawer
          imageClick={imageClick}
          profile={profile}
          key={profile.reg_no}
        />
      </Box>
    </>
  );
}
