import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
} from "@mui/material";
import Modall from "./Modal";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "./Drawer";
import ImagePart from "./ImagePart";

const profile = {
  reg_no: "12413928",
  reason: "Long-term relationship",
  age: 23,
  name: "Bharat",
  personality: "extrovert",
  images: [null, "/10.jpg", "/4.jpg", "/5.jpg", null],
  bio: "Im the solo developer of this whole Uni-Match platform...😎",
  interests: [
    "Gardening",
    "Paragliding",
    "Puzzles",
    "Astronomy",
    "Juggling",
    "Art",
  ],
};

const ProfileGrid = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageClick, setImageClick] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const list = profile.images.filter((item) => item != null);
  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  

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

  const profiles = [
    {
      name: "Rakesh, 23",
      details: "💘Long-term ",
      imageUrl: "/9.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Amit, 18",
      details: "💘Long-term ",
      imageUrl: "/6.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Bharat, 19",
      details: "🎉Casual Dating",
      imageUrl: "/5.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Tanmay, 22",
      details: "93年 · ",
      imageUrl: "/11.jpg",
      imageAlt: "Profile photo",
    },
    {
      name: "Rahul, 20",
      details: "😍Short-term",
      imageUrl: "/7.jpg",
      imageAlt: "Profile photo",
    },

    {
      name: "Deepak, 23",
      details: "🎉Casual Dating",
      imageUrl: "/8.jpg",
      imageAlt: "Profile photo",
    },

    {
      name: "Nikhil, 19",
      details: "😍Short-term",
      imageUrl: "/10.jpg",
      imageAlt: "Profile photo",
    },
    ,
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
    maxHeight: "75vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "none",
    background: "transparent",
    height: "100%",
    textAlign: "left",
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
    <>
      <Modall
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        name={"unlike"}
      />

      {imageClick && (
        <ImagePart
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
          list={list}
          currentImageIndex={currentImageIndex}
          setImageClick={setImageClick}
          prevImage={prevImage}
          nextImage={nextImage}
        />
      )}

      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          minHeight: "100vh",
          padding: {
            xs: "12px",
            sm: "14px",
            md: "18px",
          },
        }}
      >
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "24px", sm: "28px" }, // Responsive font size
              fontWeight: 600, // Bold for clear hierarchy
              color: "#333", // Subtle but clear color
              letterSpacing: "0.5px", // Improve readability
              //paddingBottom: "8px", // Space between subheading and content
              // borderBottom: "2px solid #eee", // Light separator for clarity
            }}
          >
            Likes
          </Typography>
        </Box>

        <Box
          sx={{
            height: `calc(100vh - 42px - 46px - 16px)`,
            overflowY: "auto",
            padding: "8px",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 2 }}>
            {profiles.map((profile, index) => (
              <Grid item xs={1} key={index} onClick={() => setImageClick(true)}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: "none",
                    background: "transparent",
                    height: "100%",
                    position: "relative",
                    textAlign: "left",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={profile.imageUrl}
                    alt={profile.imageAlt}
                    sx={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "26px",
                      objectFit: "cover",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: "60%", // Center vertically
                      left: "80%", // Center horizontally
                      transform: "translate(-50%, -20%)", // Adjust positioning slightly upwards
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("UnLIke Clicked");
                        setModalOpen(true);
                      }}
                      sx={{
                        width: "42px",
                        height: "42px",
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        padding: "12px",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 1)",
                        },
                        "&:active": {
                          transform: "scale(0.8)", // Less shrink to feel more natural
                          boxShadow: "0 4px 12px rgba(255, 0, 110, 0.9)", // More intense active shadow
                        },
                      }}
                    >
                      <i className="ti ti-x" style={{ fontSize: "24px" }}></i>
                    </IconButton>
                  </Box>

                  <CardContent
                    sx={{
                      paddingBottom: "12px !important",
                      paddingTop: "6px !important",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: {
                          xs: "20px",
                          sm: "26px",
                        },
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: "0px",
                      }}
                    >
                      {profile.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                        color: "#666",
                        lineHeight: 1.4,
                      }}
                    >
                      {profile.details}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              height: "40px", // Same as or slightly more than the navbar height
              backgroundColor: "transparent", // Invisible, just for spacing
            }}
          />
        </Box>
      </Box>
      <Drawer imageClick={imageClick} profile={profile} key={profile.reg_no} />
    </>
  );
};

export default ProfileGrid;
