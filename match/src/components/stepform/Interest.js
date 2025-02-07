import React from "react";
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
  const [selectedChips, setSelectedChips] = React.useState(formData.selectedInterests || []);

  const handleSelect = (chip) => {
    const updatedSelectedChips = selectedChips.includes(chip)
      ? selectedChips.filter((c) => c !== chip)
      : [...selectedChips, chip];

    setSelectedChips(updatedSelectedChips);

    // Update formData state with selected chips
    setFormData((prevState) => ({ ...prevState, selectedInterests: updatedSelectedChips }));
  };

  return (
    <div style={{ paddingTop: 60 }}>
      <Typography variant="h4" gutterBottom>
        What are you into?
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 9, justifyContent: "center" }}>
        {interests.map((item, index) => {
          const isSelected = selectedChips.includes(item);
          return (
            <Chip
              key={item}
              label={item}
              onClick={() => handleSelect(item)}
              onDelete={isSelected ? () => handleSelect(item) : undefined}
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
