import React, { useState } from "react";
import { Chip, Box } from "@mui/material";



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
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 9 }}>
      {[...Array(100)].map((item,chip) => {
        const isSelected = selectedChips.includes(chip);
        return (
          <Chip
            key={chip}
            label={chip + "...."}
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
  );
}
