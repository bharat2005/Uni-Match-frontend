import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardWrapper } from "react-swipeable-cards";

let me = {
  image: './me.jpg',
  name: 'Sammy',
  age: '19',
  reason: '🎉Casual Dating',
  interests: ["Fishing 🎣", "Dancing 💃", "Running 🏃‍♀️", "Cycling 🚴‍♂️", "Writing ✍️"],
  bio: 'Heyy...🎉! I love traveling so much!',
  personality: '🤩Extrovert',
  starsign: '🌬️Gemini',
  pets: '🐱Cat',
};

export default function Match() {
  const [lastDirection, setLastDirection] = useState("");

  function onSwipe(direction, name){
    setLastDirection(direction);
    console.log(`${name} was swiped ${direction}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      <CardWrapper onSwipe={onSwipe}>
        {[...Array(100)].map((_, index) => (
          <Card
            key={index}
            sx={{
              position: "absolute",
              width: "300px",
              height: "400px",
              color: "white",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease-in-out",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                maxHeight: "100%",
                zIndex: 1,
                backgroundColor: "black",
                paddingBottom: "20px",

                /* Hide scrollbar */
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* Shadow Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  boxShadow: "inset 0 -100px 40px 0px rgba(0, 0, 0, 0.8)",
                }}
              />

              {/* Profile Image */}
              <img
                src={me.image}
                alt="Profile"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Name & Age */}
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: "70px", // Adjusted for spacing
                  left: "20px",
                  fontWeight: "bold",
                  zIndex: 2,
                  fontSize: "25px",
                  color: "white",
                }}
              >
                {me.name}, {me.age}
              </Typography>

              {/* Reason - Separate Line */}
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  bottom: "45px", // Positioned below name/age
                  left: "20px",
                  zIndex: 2,
                  fontSize: "15px", // Slightly smaller
                  color: "white", // Gold/yellowish color for contrast
                }}
              >
                {me.reason}
              </Typography>
            </Box>
          </Card>
        ))}
      </CardWrapper>
    </Box>
  );
}