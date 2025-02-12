import React, { useState } from "react";
import { Chip, Box, Typography } from "@mui/material";

const interests = [
  ...Array(41),
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

export default function Interest({ formData, setFormData }) {
  const [chips, setChips] = useState(formData.interests || []);

  function handleSelect(chip) {
    const updatedSelectedChips = chips.includes(chip)
      ? chips.filter((c) => c !== chip)
      : [...chips, chip];

    setChips(updatedSelectedChips);
    setFormData((prev) => {
      return { ...prev, interests: updatedSelectedChips };
    });
  }

  return (
    <div style={{ paddingTop: 40, backgroundColor: "white", height: "470px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, textAlign: "center" }}
      >
        What are you into?
      </Typography>
      <Box
      mt={4}
        sx={{
          display: "flex",
          padding:'8px',
          flexDirection:'column',
          overflowY: "auto",
          height: "80%",
          gap: 1,
          alignItems:'center',
          justifyContent: "center",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {interests.map((item, index) => {
          const bool = chips.includes(item);
          return (
            <Chip
              key={item}
              label={item}
              onClick={() => handleSelect(item)}
              variant={bool ? "filled" : "outlined"}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
                padding: { xs: "6px", sm: "8px" }, 
                maxWidth: "180px", 
                minWidth: "120px", 
               
              }}
              aria-label={item}
            />
          );
        })}
      </Box>
    </div>
  );
}
