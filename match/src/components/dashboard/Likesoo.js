import React, { useEffect } from "react";
import {
  Box,
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
      details: "💘Long-term ",
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
      details: "💘Long-term ",
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
      details: "93年 · ",
      imageUrl: "/11.jpg",
      imageAlt: "Profile photo",
    },
  ];

  const containerStyle = {
    background: "transparent",
    minHeight: "100vh",
    padding: "20px",
    "@media (max-width: 991px)": {
      padding: "15px",
    },
    "@media (max-width: 640px)": {
      padding: "10px",
    },
  };

  const scrollableGridStyle = {
    maxHeight: "78vh", // Adjust height as needed
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
              <Card sx={cardStyle}>
                <CardMedia
                  component="img"
                  image={profile.imageUrl}
                  alt={profile.imageAlt}
                  sx={imageStyle}
                />
                <CardContent sx={{ paddingBottom: "12px !important", paddingTop:'6px !important'}}>
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
