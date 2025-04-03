"use client";
import * as React from "react";
import {
  Button,
  IconButton,
  Slider,
  Paper,
  Avatar,
  Typography,
  Skeleton,
  Box,
  SwipeableDrawer,
  Chip,
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createPortal } from "react-dom";
import { interests } from "./Data";

function Drawer() {
  const { profile } = useOutletContext();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const list = profile.images.filter((item) => item != null);

  React.useEffect(() => {
    setIsDrawerOpen(true);
  }, []);

  React.useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = list[currentImageIndex];
    img.onload = () => setImageLoaded(true);
  }, [currentImageIndex]);

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

  return (
    <>
      {createPortal(
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
       <Box
            sx={{
              height: "55vh",
              backgroundImage: imageLoaded ? `url(${list[currentImageIndex]})` : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "fixed",
              top: 0,
              transform: "translate3d(0, 0, 0)",
              transition: "transform 0.4s ease-out",
              willChange: "transform",
              left: 0,
              right: 0,
              zIndex: 600,
              borderRadius: "0 0 16px 16px",
            }}
          >
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="pulse"
                sx={{ position: "absolute", top: 0, left: 0,
                   bgcolor: " #fce4ec" 
                  }}
              />
            )}
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "20px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                "&:active": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent it from becoming transparent on click
                },
                "&:focus": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent any focus state change
                  outline: "none", // remove the default focus outline if needed
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <i className="ti ti-chevron-left" style={{ fontSize: "24px" }} />
            </IconButton>

            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                right: "20px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                "&:active": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent it from becoming transparent on click
                },
                "&:focus": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent any focus state change
                  outline: "none", // remove the default focus outline if needed
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <i className="ti ti-chevron-right" style={{ fontSize: "24px" }} />
            </IconButton>

            {/* Close Button */}
            <IconButton
              sx={{
                position: "absolute",
                top: "20px",
                left: "20px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                "&:active": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent it from becoming transparent on click
                },
                "&:focus": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // prevent any focus state change
                  outline: "none", // remove the default focus outline if needed
                },
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
            >
              <i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
            </IconButton>
          </Box>

          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: "left",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              p: 0,
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 1)",
              background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
              transform: isDrawerOpen
                ? "translate3d(0, 0, 0)"
                : "translate3d(0, 110%, 0)",
              transition: "transform 0.3s ease-out",
              willChange: "transform",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              zIndex: 700,
            }}
          >
            {/* Inner Container */}
            <Box
              component="form"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
                padding: "20px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                width: "auto", // Take full width
                height: "auto", // Let the content dictate height
                overflowY: "auto", // Allow inner scrolling only
              }}
            >
              {/* Profile Header */}
              <Box sx={{ mb: 1.25 }}>
                <Typography
                  sx={{ fontSize: "28px", fontWeight: 700, mb: 1.25 }}
                >
                  {profile.name}, {profile.age}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {/* Gender Chip */}
                  <Chip
                    icon={
                      <i
                        className={
                          profile.gender === "female"
                            ? "ti ti-gender-female"
                            : "ti ti-gender-male"
                        }
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    }
                    label={profile.gender === "female" ? "Female" : "Male"}
                    sx={{
                      bgcolor:
                        profile.gender === "female" ? "#FE6BA2" : "#7270F5",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />

                  {/* Personality Chip */}
                  <Chip
                    icon={
                      profile.personality === "extrovert" ? (
                        <i
                          className="ti ti-sun-filled"
                          style={{ fontSize: "18px", color: "white" }}
                        />
                      ) : profile.personality === "introvert" ? (
                        <i
                          className="ti ti-moon-filled"
                          style={{ fontSize: "18px", color: "white" }}
                        />
                      ) : (
                        <i
                          className="ti ti-seedling-filled"
                          style={{ fontSize: "18px", color: "white" }}
                        />
                      )
                    }
                    label={
                      profile.personality === "extrovert"
                        ? "Extrovert"
                        : profile.personality === "introvert"
                          ? "Introvert"
                          : "Ambivert"
                    }
                    sx={{
                      bgcolor:
                        profile.personality === "extrovert"
                          ? "#FF5C5C"
                          : profile.personality === "introvert"
                            ? "#8A2BE2"
                            : "#32CD32",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />

                  {/* Registration Number Chip */}
                  <Chip
                    icon={
                      <i
                        className="ti ti-user-filled"
                        style={{ fontSize: "18px", color: "white" }}
                      />
                    }
                    label={profile.reg_no}
                    sx={{
                      bgcolor: "#ffc107",
                      color: "white",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />

                </Box>
              </Box>

              {/* Reason Section */}
              <Typography variant="body2" sx={{ color: "#666", my: 1.25 }}>
                {profile.reason}
              </Typography>

              {/* About Section */}
              <Box
                sx={{ mt: 2, backgroundColor: "#FFFFFF", borderRadius: "24px" }}
              >
                <Typography
                  sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: "20px" }}
                >
                  About
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    overflowX: "auto",
                    p: 2,
                    pt: 0,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "24px",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                  }}
                >
                  {profile.bio}
                </Box>
              </Box>

              {/* Interests Section */}
              <Box
                sx={{ mt: 2, backgroundColor: "#FFFFFF", borderRadius: "24px" }}
              >
                <Typography
                  sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: "20px" }}
                >
                  Interests
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2.5,
                    overflowX: "auto",
                    p: 2,
                    pt: 0,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "24px",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    whiteSpace: "nowrap",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                  }}
                >
                  {profile.interests.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 45,
                          height: 45,
                          bgcolor: interests[item].bgcolor,
                          color: interests[item].color,
                          fontSize: "26px",
                        }}
                      >
                        {interests[item].icon}
                      </Avatar>
                      <Typography variant="caption" sx={{ color: "#666" }}>
                        {interests[item].label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>,
        document.body,
      )}
    </>
  );
}

export default Drawer;
