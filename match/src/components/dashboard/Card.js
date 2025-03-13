import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { createPortal } from 'react-dom';

import { ArrowBackIos, ArrowForwardIos, ArrowBack } from "@mui/icons-material";
import Drawer from './Drawer';

export default function Card({ profile }) {
  const [imageClick, setImageClick] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const list = profile.images.filter(item => item != null);
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    if (imageClick) {
      setTimeout(() => setImageLoaded(true), 10); // Trigger pop-in effect
    } else {
      setImageLoaded(false); // Trigger pop-out effect
    }
  }, [imageClick]);







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

  return (<>

{imageClick &&
  createPortal(
    <Box
      //onClick={() => setImageClick(true)}
      sx={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: imageLoaded
          ? 'translate(-50%, 0) scale(1)'
          : 'translate(-50%, 100%) scale(0.9)',
        width: '100vw',
        height: '60vh',
        zIndex: 5, // Ensure it's above everything
        backgroundImage: `url(${list[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.1s ease, transform 0.3s ease',
      }}
    >
      {/* ArrowBackIos Icon */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          color: '#fff',
        }}
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
      >
        <i className="ti ti-chevron-left" style={{ fontSize: "24px" }}></i>
      </IconButton>

      {/* ArrowForwardIos Icon */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          color: '#fff',
        }}
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
      >
         <i className="ti ti-chevron-right" style={{ fontSize: "24px" }}></i>
      </IconButton>

      {/* ChevronLeft Icon */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: '#fff',
        }}
        onClick={(e) => {
          e.stopPropagation();
          setImageClick(false);
        }}
      ><i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
      </IconButton>
    </Box>,
    document.body // Attach to body, bypassing parent context
  )
}




    <Box
      sx={{
        position: "static",
        backgroundColor: "white",
        width: "380px",
        height: "540px",
        boxShadow: "inset 0px -50px 60px 0px black",
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
          bottom: "10%",
          left: "5%",
          fontWeight: "bold",
          fontSize: "38px",
          color: "white",
        }}
      >
        {profile.name}, {profile.age}
      </Typography>

      <Drawer imageClick={imageClick} profile={profile}  key={profile.reg_no}/>
    </Box>
</>  );
}
