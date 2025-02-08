import React, { useState } from "react";
import "../../App.css";
import { Box } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";

export default function Match({ profiles }) {
  const [swipeStates, setSwipeStates] = useState({}); // Store swipe state for each profile

  const swiped = (direction, profileId) => {
    console.log(`Swiped ${profileId} to ${direction}`);

    setSwipeStates((prevStates) => ({
      ...prevStates,
      [profileId]: direction, // Store swipe direction for this profile
    }));
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
            onSwipe={(dir) => swiped(dir, profile.id)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
          >
            <Card profile={profile} lastDirection={swipeStates[profile.id]} />
          </TinderCard>
        ))}
      </div>
    </Box>
  );
}
