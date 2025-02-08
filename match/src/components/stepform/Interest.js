import React, {useState} from "react";
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

export default function Interest({ formData, setFormData }) {
  const [chips, setChips] = useState (formData.interests || []);

  function handleSelect(chip){
    const updatedSelectedChips = chips.includes(chip)
      ? chips.filter((c) => c !== chip)
      : [...chips, chip];

    setChips(updatedSelectedChips);
    setFormData((prev) => {
      return { ...prev, interests: updatedSelectedChips }
  });
  };

  return (
    <div style={{ paddingTop: 60 }}>
      <Typography variant="h4" gutterBottom>
        What are you into?
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 9, justifyContent: "center" }}>
        {interests.map((item, index) => {
          const bool = chips.includes(item);
          return (
            <Chip
              key={item}
              label={item}
              onClick={() => handleSelect(item)}
              onDelete={bool ? () => handleSelect(item) : undefined}
              variant={bool ? "filled" : "outlined"}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                ...(bool ? selectedColor : {}),
                "&:hover": {
                  ...(bool ? selectedColor : hoverColor),
                },
              }}
            />
          );
        })}
      </Box>
    </div>
  );
}
