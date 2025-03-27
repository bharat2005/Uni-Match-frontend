import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SmallLoading from "../login/SmallLoading";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "../../OldComp/Drawer";
import { createPortal } from "react-dom";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ImagePart() {
  const {
    profile,
    setImageClick,
    // imageClick
  } = useOutletContext();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const list = profile.images.filter((item) => item != null);

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
      createPortal(
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: imageLoaded
            ? "translate(-50%, 0) scale(1)"
            : "translate(-50%, 100%) scale(0.9)",
          width: "100vw",
          height: "55vh",
          zIndex: 55,
          background: imageLoaded
            ? `url(${list[currentImageIndex]})`
            : "linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.1s ease, transform 0.3s ease",
        }}
      >
        {!imageLoaded && <SmallLoading />}
        <img
          src={list[currentImageIndex]}
          alt="profile"
          style={{
            display: "none",
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)} // Fallback if the image fails to load
        />

        {/* Left Arrow */}
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

        {/* Right Arrow */}
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
          onClick={(e) => {
            e.stopPropagation();
            console.log("hi");
            navigate(-1);
          }}
        >
          <i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
        </IconButton>

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
                width: index === currentImageIndex ? "8px" : "6px", // Slight size increase for active dot
                height: index === currentImageIndex ? "8px" : "6px",
                borderRadius: "50%",
                backgroundColor:
                  index === currentImageIndex
                    ? "white" // Soft pink for active
                    : "#D3D3D3", // Light gray for inactive
                opacity: index === currentImageIndex ? 1 : 0.5, // Subtle fade for inactive
                transition: "all 0.2s ease",
                transform:
                  index === currentImageIndex ? "scale(1.1)" : "scale(1)", // Gentle size bump for active
              }}
            />
          ))}
        </Box>
      </Box>
      , document.body)
      <Drawer imageClick={true} profile={profile} />
    </>
  );
}
