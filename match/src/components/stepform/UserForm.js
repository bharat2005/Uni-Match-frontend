import React from "react";
import { TextField, ToggleButton, ToggleButtonGroup, Grid, Typography } from "@mui/material";

export default function UserForm({ formData, setFormData }) {

  function calculateAge(day, month, year){
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); 
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function handleInputChange(e) {
    if (["day", "month", "year"].includes(e.target.name)) {
      const newDob = { ...formData.dob, [e.target.name]: e.target.value };
      const age = calculateAge(newDob.day, newDob.month, newDob.year);
      setFormData((prev) => ({
        ...prev,
        dob: newDob, 
        age: age,    
      }));
    } else {
      setFormData((prev) => {
        return {...prev, [e.target.name]: e.target.value }
      })
    }
  }

  function handleGenderChange(e, gender) {
    if (gender !== null) {
      setFormData({ ...formData, gender: gender });
    }
  }

  return (
    <div style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}> 
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        Introduce yourself
      </Typography>

      <Grid container mt={2} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
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

        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
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
                  padding: { xs: "8px", sm: "12px" }, 
                }}
              >
                {gender.toUpperCase()}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
            What's your birthdate? 🎂
          </Typography>
          <Grid container spacing={2}>
            {["day", "month", "year"].map((field) => (
              <Grid item xs={4} key={field}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  variant="outlined"
                  name={field}
                  value={formData.dob[field] || ''}
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
}
