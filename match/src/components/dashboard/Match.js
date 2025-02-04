import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Card, CardWrapper } from "react-swipeable-cards";

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
              color: "black",
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
              overflow: "hidden",  // Prevents weird shifting inside
            }}
          >
            {/* Ensure the Box remains fixed inside the Card */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                position: "relative", // Changed from absolute to relative
              }}
            />
          </Card>
        ))}
      </CardWrapper>
    </Box>
  );
}

