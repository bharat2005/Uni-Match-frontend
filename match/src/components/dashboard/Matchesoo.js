import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const ProfileGrid = () => {
  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const profiles = [
    {
      name: "Bharat, 19",
      details: "🎉Casual Dating",
      imageUrl: "/5.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Amit, 18",
      details: "💘Long-term",
      imageUrl: "/6.avif",
      imageAlt: "Profile photo",
    },
    {
      name: "Rahul, 20",
      details: "😍Short-term",
      imageUrl: "/7.avif",
      imageAlt: "Profile photo",
    },
    {
      name: "Deepak, 23",
      details: "🎉Casual Dating",
      imageUrl: "/8.webp",
      imageAlt: "Profile photo",
    },
    {
      name: "Rakesh, 23",
      details: "💘Long-term",
      imageUrl: "/9.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Nikhil, 19",
      details: "😍Short-term",
      imageUrl: "/10.avif",
      imageAlt: "Profile photo",
    },
    {
      name: "Tanmay, 22",
      details: "😍Short-term",
      imageUrl: "/11.jpg",
      imageAlt: "Profile photo",
    },
  ];

  const containerStyle = {
    background: "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
    minHeight: "100vh",
    padding: {
      xs: "10px",
      sm: "15px",
      md: "20px",
    },
  };

  const scrollableGridStyle = {
    maxHeight: "75vh", // Adjust height as needed
    overflowY: "auto",
    //border: "1px solid #ddd", // Optional for visual clarity
    "&::-webkit-scrollbar": {
      display: "none", // For Chrome, Safari, and Opera
    },
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "none",
    background:'transparent',
    height: "100%",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "26px",
    objectFit: "cover",
  };

  const nameStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: {
      xs: "20px",
      sm: "26px",
    },
    fontWeight: 600,
    color: "#333",
    marginBottom: "0px",
  };

  const detailsStyle = {
    fontFamily: '"Inter", sans-serif',
    fontSize: {
      xs: "12px",
      sm: "14px",
    },
    color: "#666",
    lineHeight: 1.4,
  };

  return (
    <Box sx={containerStyle}>
      {/* Scrollable Grid */}
      <Box sx={scrollableGridStyle}>
        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 2 }}>
          {profiles.map((profile, index) => (
            <Grid item xs={1} key={index}>
 <Card
  sx={{
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "none",
    background: "transparent",
    height: "100%",
    position: "relative",
    textAlign:'left',
  }}
>
  <CardMedia
    component="img"
    image={profile.imageUrl}
    alt={profile.imageAlt}
    sx={{
      width: "100%",
      height: "220px",
      borderRadius: "26px",
      objectFit: "cover",
    }}
  />

  {/* Heart and Cross Buttons */}
  <Box
    sx={{
      position: "absolute",
      top: "60%", // Center vertically
      left: "50%", // Center horizontally
      transform: "translate(-50%, -20%)", // Adjust positioning slightly upwards
      display: "flex",
      gap: 2,
    }}
  >
    <IconButton
      aria-label="like"
      sx={{
        background: "linear-gradient(145deg, #FF8BA7 0%, #FF6584 50%, #FF4D6D 100%)", // Softer but striking gradient
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        boxShadow: "0 8px 24px rgba(255, 101, 132, 0.3)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
    
        "&:focus": {
          boxShadow: "0 8px 24px rgba(255, 101, 132, 0.3)",
        },
        "&:active": {
          transform: "scale(0.95)",
          boxShadow: "0 4px 12px rgba(255, 101, 132, 0.5)",
        },
      
      }}
    >
      <i className="ti ti-heart-filled" style={{ fontSize: "26px", color: "white" }} />
    </IconButton>
    <IconButton
      aria-label="dislike"
      sx={{
        background: "linear-gradient(145deg, #A0D8FF 0%, #76B7FF 40%, #4A90E2 100%)", // Softer and more balanced blue
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        boxShadow: "0 8px 24px rgba(118, 183, 255, 0.3)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
    
        "&:focus": {
          boxShadow: "0 8px 24px rgba(118, 183, 255, 0.3)",
        },
        "&:active": {
          transform: "scale(0.95)",
          boxShadow: "0 4px 12px rgba(118, 183, 255, 0.5)",
        },
      }}
    >
      <i className="ti ti-x" style={{ fontSize: "26px", color: "white" }} />
    </IconButton>
  </Box>

  <CardContent sx={{ paddingBottom: "12px !important", paddingTop: "6px !important" }}>
    <Typography sx={nameStyle}>{profile.name}</Typography>
    <Typography sx={detailsStyle}>{profile.details}</Typography>
  </CardContent>
</Card>


            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileGrid;