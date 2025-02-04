import React, { useState } from "react";
import { TextField, ToggleButton, ToggleButtonGroup, Grid, Typography } from "@mui/material";

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
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        User Information Form
      </Typography>

      <Grid container spacing={2}>
        {/* Name Field */}
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Gender Selection */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Gender
          </Typography>
          <ToggleButtonGroup
            value={formData.gender}
            exclusive
            onChange={handleGenderChange}
            fullWidth
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
            <ToggleButton value="other">Other</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Date of Birth
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Day"
                variant="outlined"
                name="day"
                value={formData.dob.day}
                onChange={handleInputChange}
                inputProps={{ maxLength: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Month"
                variant="outlined"
                name="month"
                value={formData.dob.month}
                onChange={handleInputChange}
                inputProps={{ maxLength: 2 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Year"
                variant="outlined"
                name="year"
                value={formData.dob.year}
                onChange={handleInputChange}
                inputProps={{ maxLength: 4 }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForm;
