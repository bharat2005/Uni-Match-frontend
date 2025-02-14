import React, { useState } from "react";
import {
  Box,
  Button,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function FilterModal({ open, setOpen, setProfiles }) {
  const [ageRange, setAgeRange] = useState([18, 24]); // Age range slider value
  const [gender, setGender] = useState(""); // Selected gender
  const [reason, setReason] = useState(""); // Selected reason

  const reasons = [
    "Casual Dating",
    "Short-term fun",
    "Long-term relationship",
    "New friends",
    "Study buddy",
    "Still figuring it out",
  ];

  // Handle form submission
  const handleApplyFilters = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (gender && reason) {
      const filters = { ageRange, gender, reason };
      console.log(filters);

      // Send POST request with filters
      axios
        .post("http://127.0.0.1:5000/filtered_dashboard", filters)
        .then((response) => {
          setProfiles(response.data); // Update profiles in the parent component
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
      setOpen(false); // Close modal after applying filters
    } else {
      alert("Please fill all fields before applying the filters.");
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
          textAlign: "center", // Center-align content horizontally
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Filter
        </Typography>

        <form onSubmit={handleApplyFilters}>
          {/* Age Range Slider */}
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="body1" gutterBottom>
              Age Range (18-24)
            </Typography>
            <Slider
              value={ageRange}
              onChange={(e, value) => setAgeRange(value)}
              min={18}
              max={24}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                mx: "auto",
                width: "80%",
                color: "black !important",
              }}
            />
          </div>

          {/* Gender Toggle Buttons */}
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="body1" gutterBottom>
              Gender
            </Typography>
            <ToggleButtonGroup
              value={gender}
              exclusive
              onChange={(e, value) => setGender(value)}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ToggleButton
                value="male"
                sx={{
                  width: "40%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                  "&.Mui-selected": {
                    backgroundColor: "black !important",
                    color: "white !important",
                  },
                }}
              >
                Male
              </ToggleButton>
              <ToggleButton
                value="female"
                sx={{
                  width: "40%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                  "&.Mui-selected": {
                    backgroundColor: "black !important",
                    color: "white !important",
                  },
                }}
              >
                Female
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {/* Reason Filter */}
          <div style={{ marginBottom: "30px" }}>
            <Typography variant="body1" gutterBottom>
              Looking for?
            </Typography>
            <Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              required
              variant="outlined"
              sx={{
                width: "80%",
                mx: "auto",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Change the border color when focused
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black", // Change the border color on hover
                },
                ".MuiSelect-select": {
                  color: "black", // Change selected text color
                },
              }}
            >
              <MenuItem value="">Select a reason</MenuItem>
              {reasons.map((reasonOption, index) => (
                <MenuItem key={index} value={reasonOption}>
                  {reasonOption}
                </MenuItem>
              ))}
            </Select>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="outlined"
              style={{ color: "black", borderColor: "black" }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "black" }}
            >
              Apply
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
