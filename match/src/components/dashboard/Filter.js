"use client";
import * as React from "react";
import {
  Button,
  IconButton,
  Slider,
  Typography,
  List,
  ListItemButton,
  TextField,
  ListItemText,
  Box,
  SwipeableDrawer,
  Chip,
} from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";

const styles = {
  appContainer: {
    background: "linear-gradient(135deg, #ffe5f2, #e5f0ff)",
    minHeight: "100vh",
    fontFamily: '"Noto Sans SC", sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    color: "#333",
  },
  locationButton: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "16px",
    color: "#333",
    textTransform: "none",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      background: "white",
      maxHeight: "90vh",
    },
  },
  searchHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "30px",
    position: "relative",
    padding: "20px 20px 0 20px",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    fontSize: "24px",
    color: "#999",
  },
  drawerContent: {
    padding: "0 20px 20px 20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
  },
  label: {
    color: "black",
    fontSize: "16px",
    fontWeight: 500,
  },
  optionsContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: "18px",
    fontSize: "14px",
    padding: "18px 12px",
    backgroundColor: "white",
    border: "1px solid #eee",
    color: "#666",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.selected": {
      backgroundColor: "#ff6b9c",
      color: "white",
      //borderColor: "#ff6b9c",
      boxShadow: "0 2px 4px rgba(255, 107, 156, 0.2)",
      "&:hover": {
        backgroundColor: "#ff5b8c",
      },
    },
  },
  locationSelector: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "12px",
    border: "1px solid #eee",
    borderRadius: "8px",
    color: "#666",
    fontSize: "14px",
    background: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "0px",
    padding: "0 20px 20px 20px",
  },
  resetButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "25px",
    fontSize: "16px",
    background: "white",
    border: "1px solid #eee",
    color: "black",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      borderColor: "#ddd",
    },
  },
  searchButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "25px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#ff6b9c",
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ff5b8c",
      boxShadow: "none",
    },
  },
  sliderContainer: {
    padding: "0 10px",
  },
  slider: {
    color: "#ff6b9c",
    "& .MuiSlider-thumb": {
      backgroundColor: "white",
      border: "2px solid #ff6b9c",
      "&:hover, &.Mui-focusVisible": {
        boxShadow: "0 0 0 8px rgba(255, 107, 156, 0.16)",
      },
    },
    "& .MuiSlider-track": {
      backgroundColor: "#ff6b9c",
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#eee",
    },
  },
};

function AppContainer({ isDrawerOpen, setIsDrawerOpen, setProfiles }) {
  const [selectedGender, setSelectedGender] = React.useState("");
  const [smallDrawerOpen, setSmallDrawerOpen] = React.useState(false);
  const [selectedPersonality, setSelectedPersonality] = React.useState("");
  const [ageRange, setAgeRange] = React.useState([0, 0]);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [section, setSection] = React.useState("")

 
  const handleApplyFilters = (e) => {
    //e.preventDefault();
  
   
      const filters = { 
        ageRange, 
        gender: selectedGender, 
        reason: selectedOption,
        personality: selectedPersonality,
        section: section
      };
      console.log(filters);
  
      axios
        .post("https://api.uni-match.in/filtered_dashboard", filters, {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        })
        .then((response) => {
          console.log(response.data)
          setProfiles(response.data);
        })
        .catch((error) => {
          console.error("Error: ", error);
  
          if (error.response?.status === 401) {
            axios
              .post(
                "https://api.uni-match.in/refresh",
                {},
                {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
                  },
                },
              )
              .then((response) => {
                const csrfTokenAccess = response.headers["x-csrf-token-access"];
                localStorage.setItem("csrfTokenAccess", csrfTokenAccess);
  
                axios
                  .post(
                    "https://api.uni-match.in/filtered_dashboard",
                    filters,
                    {
                      withCredentials: true,
                      headers: {
                        "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                      },
                    },
                  )
                  .then((response) => {
                    console.log(
                      "Protected Data (After Refresh):",
                      response.data,
                    );
                    setProfiles(response.data);
                  })
                  .catch((retryError) =>
                    console.error("Failed after refresh:", retryError),
                  );
              })
              .catch(() =>
                console.error("Session expired, please log in again."),
              );
          }
        });
      setIsDrawerOpen(false);

  };
  


  const toggleSmallDrawer = (open) => () => setSmallDrawerOpen(open);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSmallDrawerOpen(false);
  };
  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={true}
        sx={styles.drawer}
      >
        <Box sx={styles.searchHeader}>
          <Typography variant="h5" component="h1" sx={{ color: "black" }}>
            Filter
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "#999",
            }}
            onClick={toggleDrawer(false)}
          >
            <i className="ti ti-x" style={{ fontSize: "24px" }}></i>
          </IconButton>
        </Box>

        <Box component="form" sx={styles.drawerContent}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "12px",
            }}
          >

<TextField
  fullWidth
  value={section}
  onChange={(e)=> setSection(e.target.value)}
  placeholder="Enter section (e.g., K24EU)"
    inputProps={{
    maxLength: 5,
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      backgroundColor: "white",
      "& fieldset": {
        borderColor: "#eee",
      },
      "&:hover fieldset": {
        borderColor: "#ccc", // Slightly darker on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff6b9c", // Different color on focus
      },
    },
  }}
/>




            <Typography sx={styles.label}>Age</Typography>
            <Box sx={styles.sliderContainer}>
              <Slider
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
                min={18}
                max={30}
                sx={styles.slider}
              />
              <Typography
                sx={{ textAlign: "right", color: "#333", fontSize: "14px" }}
              >
                {ageRange[0]}-{ageRange[1]} age
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.formGroup}>
            <Typography sx={styles.label}>Gender</Typography>
            <Box sx={styles.optionsContainer}>
              {["Male", "Female"].map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => setSelectedGender(option)}
                  sx={styles.chip}
                  className={selectedGender === option ? "selected" : ""}
                />
              ))}
            </Box>
          </Box>

          <Box sx={styles.formGroup}>
            <Typography sx={styles.label}>Personality</Typography>
            <Box sx={styles.optionsContainer}>
              {["Introvert", "Extrovert", "Ambivert"].map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => setSelectedPersonality(option)}
                  sx={styles.chip}
                  className={selectedPersonality === option ? "selected" : ""}
                />
              ))}
            </Box>
          </Box>

          <Box sx={styles.formGroup}>
            <Typography sx={styles.label}>Looking For?</Typography>
            <Button
              sx={styles.locationSelector}
              endIcon={<KeyboardArrowRightIcon />}
              onClick={toggleSmallDrawer(true)}
            >
              {selectedOption==""? "select option": selectedOption}
            </Button>
          </Box>
        </Box>

        <Box sx={styles.buttonGroup}>
          <Button
            sx={styles.resetButton}
            onClick={() => {
              setSelectedGender("");
              setSelectedPersonality("");
              setAgeRange([0, 0]);
              handleOptionSelect("")
              setSection("")
            }}
          >
            Reset
          </Button>
          <Button sx={styles.searchButton} variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Box>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor="bottom"
        open={smallDrawerOpen}
        onClose={toggleSmallDrawer(false)}
        disableSwipeToOpen={true}
        sx={{
          "& .MuiDrawer-paper": {
            background: "white",
            maxHeight: "90vh",
          },
        }}
      >
        <List sx={{ paddingBottom: 0 }}>
          {[
          "🎉 Casual dating",
          "💘 Long-term",
          "😍 Short-term" ,
          "👋 New friends",
          "🎓  Study buddy",
          "🤔 Still figuring",
        ].map((option, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleOptionSelect(option)}
              sx={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <ListItemText primary={option} sx={{ textAlign: "center" }} />
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default AppContainer;
