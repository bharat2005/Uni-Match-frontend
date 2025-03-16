import React, { useState, useMemo, useRef, useEffect } from "react";
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import { Interests } from "@mui/icons-material";

const db = [
  {
    reg_no: "12432322",
    reason: "Casual Dating",
    age: 19,
    name: "Yuki",
    images: [null, "9.jpg", "/10.jpg", "/11.jpg", null],
    bio: "I love sunny days all time!!!",
    personality: "extrovert",
    interests: [
      "Gardening",
      "Paragliding",
      "Puzzles",
      "Juggling",
      "Art",
      "Juggling",
    ],
  },
  {
    reg_no: "12432323",
    reason: "Serious Relationship",
    age: 19,
    name: "May",
    images: [null, "/7.jpg", "/8.jpg", null, null],
    bio: "Spring is my vibe, i love greenery!",
    interests: [
      "Gardening",
      "Paragliding",
      "Puzzles",
      "Juggling",
      "Art",
      "Juggling",
    ],
  },
  {
    reg_no: "12432324",
    reason: "Friendship",
    age: 21,
    name: "Misaki",
    images: [null, null, "/4.jpg", "/5.jpg", "/6.jpg"],
    bio: "Just enjoying the life as much as possible!!",
    interests: [
      "Gardening",
      "Paragliding",
      "Puzzles",
      "Juggling",
      "Art",
      "Juggling",
    ],
  },
  {
    reg_no: "12413928",
    reason: "💘Long-term relationship",
    age: 20,
    name: "Jisoo",
    personality: "extrovert",
    images: ["/2.jpg", "/3.jpg", "/1.jpg", null, null],
    bio: "Im the solo developer of this whole Uni-Match platform...😎",
    interests: [
      "Gardening",
      "Paragliding",
      "Puzzles",
      "Juggling",
      "Art",
      "Juggling",
    ],
  },
];

export default function Match() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [],
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  const swiped = (direction, nameToDelete, index) => {
    updateCurrentIndex(index - 1);
    console.log("gygy");
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < db.length) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          position: "relative",
        }}
      >
        {/* Conditional rendering of the image when imageClick is true */}

        {db.map((profile, index) => (
          <TinderCard
            className="swipe"
            key={profile.reg_no}
            ref={childRefs[index]}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
            swipeRequirementType="position"
            swipeThreshold={150}
            flickOnSwipe={true}
          >
            <Card profile={profile} />
          </TinderCard>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          gap={12}
          sx={{
            position: "absolute",
            bottom: "10%",
            zIndex: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => swipe("left")}
            sx={{
              background:
                "linear-gradient(145deg, #FF006E 0%, #FB5607 50%, #FFBE0B 100%)", // More vibrant gradient
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              boxShadow: "0 8px 24px rgba(255, 0, 110, 0.6)", // Increased shadow intensity for more pop
              backdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s ease",

              "&:focus": {
                boxShadow: "0 8px 24px rgba(255, 0, 110, 0.8)", // Stronger focus effect
              },
              "&:active": {
                transform: "scale(0.8)", // Less shrink to feel more natural
                boxShadow: "0 4px 12px rgba(255, 0, 110, 0.9)", // More intense active shadow
              },
            }}
          >
            <i
              className="ti ti-x"
              style={{ fontSize: "60px", color: "white" }}
            />
          </Button>

          <Button
            variant="contained"
            onClick={() => swipe("right")}
            sx={{
              background:
                "linear-gradient(145deg, #00C853 0%, #B2FF59 50%, #FFD600 100%)", // Vibrant green to lime to yellow
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              boxShadow: "0 8px 24px rgba(0, 200, 83, 0.6)", // Fresh green glow
              backdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s ease",

              "&:focus": {
                boxShadow: "0 8px 24px rgba(0, 200, 83, 0.8)", // Strong green glow on focus
              },
              "&:active": {
                transform: "scale(0.8)", // Consistent shrink effect
                boxShadow: "0 4px 12px rgba(0, 200, 83, 0.9)", // Punchy feedback
              },
            }}
          >
            <i
              className="ti ti-heart-filled"
              style={{ fontSize: "60px", color: "white" }}
            />
          </Button>
        </Box>
      </Box>
    </>
  );
}
