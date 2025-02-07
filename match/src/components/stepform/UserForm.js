import React, { useState } from "react";
import { TextField, ToggleButton, ToggleButtonGroup, Grid, Typography, Box } from "@mui/material";

const UserForm = ({ formData, setFormData }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["day", "month", "year"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        dob: { ...prev.dob, [name]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenderChange = (event, newGender) => {
    if (newGender !== null) {
      setFormData({ ...formData, gender: newGender });
    }
  };

  return (
    <div style={{ paddingTop: 60, paddingLeft: 60, paddingRight: 60 }}>
      {/* Main form content */}
      <Typography variant="h4" gutterBottom>
        Introduce yourself
      </Typography>

      <Grid container mt={5} spacing={3}>
        {/* Name Field */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            What should we call you?✨
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              "& label": { color: "black" },
              "& label.Mui-focused": { color: "black" },
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
              },
              marginBottom: 2,
            }}
          />
        </Grid>

        {/* Gender Selection */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            What’s your gender?🚻
          </Typography>
          <ToggleButtonGroup
            value={formData.gender}
            exclusive
            onChange={handleGenderChange}
            fullWidth
          >
            {["male", "female", "other"].map((gender) => (
              <ToggleButton
                key={gender}
                value={gender}
                sx={{
                  backgroundColor: formData.gender === gender ? "black" : "transparent",
                  color: formData.gender === gender ? "white" : "black",
                  border: "1px solid #ccc",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                  "&.Mui-selected": { backgroundColor: "black !important", color: "white !important" },
                  marginBottom: 3,
                }}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        {/* Birthday Fields */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            What's your birthdate? 🎂
          </Typography>
          <Grid container spacing={2}>
            {["day", "month", "year"].map((field) => (
              <Grid item xs={4} key={field}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  name={field}
                  value={formData.dob[field]}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: field === "year" ? 4 : 2 }}
                  fullWidth
                  sx={{
                    "& label": { color: "black" },
                    "& label.Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
                    },
                    marginBottom: 2,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForm;

