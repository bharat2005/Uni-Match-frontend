import React, { useState } from "react";
import { Chip, Box, Typography } from "@mui/material";

const interests = [
  "Movies/TV shows 🎬",
  "Music festivals / Concerts 🎶",
  "Sports / Fitness 🏋️‍♂️",
  "Gaming 🎮",
  "Traveling ✈️",
  "Cooking / Trying new foods 🍽️",
  "Art / Photography 🎨",
  "Books / Reading 📖",
  "Hiking 🥾",
  "Painting 🖌️",
  "Yoga 🧘‍♀️",
  "Camping ⛺",
  "Fishing 🎣",
  "Dancing 💃",
  "Running 🏃‍♀️",
  "Cycling 🚴‍♂️",
  "Writing ✍️",
  "Podcasts 🎧",
  "Social media 📱",
  "Music production 🎧",
  "Shopping 🛍️",
  "Swimming 🏊‍♂️",
  "Board games 🎲",
  "Video games 🕹️",
  "Makeup 💄",
  "Gardening 🌱",
  "Fitness training 🏃‍♂️",
  "Baking 🍰",
  "Skiing 🎿",
  "Food tasting 🍷",
  "Road trips 🚗",
  "Pet care 🐾",
  "Fashion styling 👗",
  "Web design 💻"
];






const selectedColor = { backgroundColor: "grey", color: "white" };

const hoverColor = { backgroundColor: "black", color: "black" };

export default function CustomSelectableChips() {
  const [selectedChips, setSelectedChips] = useState([]);

  const handleSelect = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  return (
    <div style={{ paddingTop:60 }}>
    <Typography variant="h4" gutterBottom>
      What are you into?
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 9 , justifyContent:'center'}}>
      {interests.map((item,chip) => {
        const isSelected = selectedChips.includes(chip);
        return (
          <Chip
            key={item}
            label={item}
            onClick={() => handleSelect(chip)}
            onDelete={isSelected ? () => handleSelect(chip) : undefined}
            variant={isSelected ? "filled" : "outlined"}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              ...(isSelected ? selectedColor : {}),
              "&:hover": {
                ...(isSelected ? selectedColor : hoverColor), 
              },
            }}
          />
        );
      })}
    </Box>
    </div>
  );
}
