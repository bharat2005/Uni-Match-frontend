import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardWrapper } from "react-swipeable-cards";

let me = {
  image: './me.jpg',
  name: 'Sammy',
  age: '19',
  reason: 'Here for Dating',
  interests: ['pizza', 'traveling', 'football', 'movies', 'music'],
  bio: 'I love those guys who are so much caring!',
  personality: 'extrovert',
  starsign: 'gemini',
  pets: 'cat',
};

export default function Match() {
  const [lastDirection, setLastDirection] = useState("");

  const onSwipe = (direction, name) => {
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
      <CardWrapper onSwipe={onSwipe} swipeThreshold={0.1}>
        {[...Array(100)].map((_, index) => (
          <Card
            key={index}
            sx={{
              position: "absolute",
              width: "300px",
              height: "400px",
              color: "white",
              backgroundColor: "black",
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
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  boxShadow: "inset 0 20px 30px 0px rgba(0, 0, 0, 0.8), inset 0 -20px 30px 0px rgba(0, 0, 0, 0.8)", // Stronger and more spread shadow
                }}
              />

    
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

        
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "10px", 
                  left: "10px", 
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", 
                  zIndex: 2, 
                  color: "white",
                }}
              >
                {me.name}, {me.age}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: "30px", 
                  left: "10px", 
                  fontWeight: "normal",
                  color: "white",
                  zIndex: 2,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
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
