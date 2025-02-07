import React, { useState } from "react";
import "../../App.css";
import { Box, Typography, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Card from './Card';

let profiles = [
  {
    id: 1,
    images: ["/me.jpg", "/me2.jpg", "/me3.jpg"],
    name: "Sammy",
    age: "19",
    reason: "🎉 Casual Dating",
  }
];

export default function App() {
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, name) => {
    console.log("Swiped " + name + " to " + direction);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="cardContainer">
        {profiles.map((profile) => (
          <TinderCard
            className="swipe"
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile.name)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
          >
            <Card profile={profile} />
          </TinderCard>
        ))}
      </div>
    </Box>
  );
}

