import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import { createPortal } from 'react-dom';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from './Drawer';
import SmallLoading from '../login/SmallLoading';

export default function Card({ profile }) {
  const [imageClick, setImageClick] = useState(false);
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

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  };

  return (
    <>
      {imageClick &&
        createPortal(
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: imageLoaded
                ? 'translate(-50%, 0) scale(1)'
                : 'translate(-50%, 100%) scale(0.9)',
              width: '100vw',
              height: '60vh',
              zIndex: 5,
              background: imageLoaded 
              ? `url(${list[currentImageIndex]})`
              : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.1s ease, transform 0.3s ease',
            }}
          >
           {!imageLoaded && (
            <SmallLoading/>
            )}
              <img  
              src={list[currentImageIndex]}
              alt="profile"
              style={{
                display: 'none', 
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)} // Fallback if the image fails to load
            />






            {/* Left Arrow */}
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
              <ArrowBackIos />
            </IconButton>

            {/* Right Arrow */}
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
              <ArrowForwardIos />
            </IconButton>

            {/* Close Button */}
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
            >
              <i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
            </IconButton>

            {/* ✅ Dots Indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              {list.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "48px",
                    height: "4px",
                    borderRadius: "15%",
                    backgroundColor: index === currentImageIndex ? '#fff' : '#888',
                    opacity: index === currentImageIndex ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>,
          document.body
        )}

      <Box
        sx={{
          position: "relative",
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
          <ArrowBackIos sx={{visibility:"hidden"}}/>
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
          <ArrowForwardIos sx={{visibility:"hidden"}}/>
        </IconButton>

        {/* Open in Modal */}
        <IconButton
          onPointerDown={() => setImageClick(true)}
          sx={{
            position: "absolute",
            bottom: "12%",
            right: "6%",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "12px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <i className="ti ti-arrow-up" style={{ fontSize: "26px" }}></i>
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
                width: "48px",
                height: "4px",
                borderRadius: "15%",
                backgroundColor: index === currentImageIndex ? "#fff" : "#888",
                opacity: index === currentImageIndex ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            />
          ))}
        </Box>

        {/* Profile Info */}
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            fontWeight: "bold",
            fontSize: "28px",
            color: "white",
          }}
        >
          {profile.name}, {profile.age}
        </Typography>

        <Drawer imageClick={imageClick} profile={profile} key={profile.reg_no} />
      </Box>
    </>
  );
}
