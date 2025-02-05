import React, { useState } from "react";
import { TextField, ToggleButton, ToggleButtonGroup, Grid, Typography, Box } from "@mui/material";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
  });

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
      <Typography variant="h4" gutterBottom>
        Introduce yourself
      </Typography>

      <Grid container mt={5} spacing={3}> {/* Increased spacing between fields */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Name
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{
              "& label": {
                color: "black", // Default label color
                textAlign: "left", // Left-align the label
              },
              "& label.Mui-focused": {
                color: "black", // Label color when focused
              },
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              },
              marginBottom: 2, // Spacing between fields
            }}
          />
        </Grid>

        {/* Gender Selection */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            You are...
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
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)", // Default hover effect
                  },
                  "&.Mui-selected": {
                    backgroundColor: "black !important", // Keep black when selected
                    color: "white !important",
                  },
                  marginBottom: 3, // Spacing below gender buttons
                }}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Birthday
          </Typography>
          <Grid container spacing={3}> {/* Increased spacing between DOB fields */}
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
                    "& label": {
                      color: "black", // Default label color
                      textAlign: "left", // Left-align the label
                    },
                    "& label.Mui-focused": {
                      color: "black", // Label color when focused
                    },
                    "& .MuiOutlinedInput-root": {
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                    },
                    marginBottom: 2, // Spacing between DOB fields
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
