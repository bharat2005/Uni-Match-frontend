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
  const [ageRange, setAgeRange] = useState([18, 24]); 
  const [gender, setGender] = useState(""); 
  const [reason, setReason] = useState(""); 

  const reasons = [
    "Casual Dating",
    "Short-term fun",
    "Long-term relationship",
    "New friends",
    "Study buddy",
    "Still figuring it out",
  ];

  
  const handleApplyFilters = (e) => {
    e.preventDefault(); 

    if (gender && reason) {
      const filters = { ageRange, gender, reason };
      console.log(filters);

    
      axios
        .post("https://api.uni-match.in/filtered_dashboard", filters, {withCredentials: true, headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") }})
        .then((response) => {
          setProfiles(response.data); 
        })
        .catch((error) => {
          console.error("Error: ", error);
          
        if (error.response?.status === 401) {

          axios.post("/refresh", {}, { withCredentials:true })

            .then((refreshResponse) => {

                const csrfToken = refreshResponse.headers["x-csrf-token"]
                localStorage.setItem("csrfToken", csrfToken)

                axios.post("https://api.uni-match.in/filtered_dashboard", filters, { withCredentials:true,  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") } })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data)
                  setProfiles(response.data); 
                })
                .catch((retryError) => console.error("Failed after refresh:", retryError));
            })
            .catch(() => console.error("Session expired, please log in again."));
        }
        });
      setOpen(false); 
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
          textAlign: "center", 
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Filter
        </Typography>

        <form onSubmit={handleApplyFilters}>
          
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
                  borderColor: "black", 
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                ".MuiSelect-select": {
                  color: "black", 
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
