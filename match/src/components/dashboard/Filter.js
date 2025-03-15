"use client";
import * as React from "react";
import {
  Button,
  IconButton,
  Slider,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
  SwipeableDrawer,
  Chip,
} from "@mui/material";
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
    color: "#333",
    fontSize: "14px",
    fontWeight: 500,
  },
  optionsContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: "20px",
    fontSize: "14px",
    padding: "8px 12px",
    backgroundColor: "white",
    border: "1px solid #eee",
    color: "#666",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.selected": {
      backgroundColor: "#ff6b9c",
      color: "white",
      borderColor: "#ff6b9c",
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
    padding: "12px",
    borderRadius: "25px",
    fontSize: "14px",
    background: "white",
    border: "1px solid #eee",
    color: "#666",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      borderColor: "#ddd",
    },
  },
  searchButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "25px",
    fontSize: "14px",
    color: "white",
    backgroundColor: "#ff6b9c",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff5b8c",
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

function AppContainer({isDrawerOpen, setIsDrawerOpen}) {
 
  const [selectedGender, setSelectedGender] = React.useState("不限");
  const [smallDrawerOpen, setSmallDrawerOpen] = React.useState(false);
  const [selectedMarriage, setSelectedMarriage] = React.useState("不限");
  const [ageRange, setAgeRange] = React.useState([18, 23]);
  const [selectedOption, setSelectedOption] = React.useState("");




 
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

  return (<>
   

      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={styles.drawer}
      >
        <Box sx={styles.searchHeader}>
          <Typography variant="h6" component="h1">
            Filter
          </Typography>
          <IconButton sx={styles.closeButton} onClick={toggleDrawer(false)}>
            ×
          </IconButton>
        </Box>

        <Box component="form" sx={styles.drawerContent}>
          <Box sx={styles.formGroup}>
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
                  onClick={() => setSelectedMarriage(option)}
                  sx={styles.chip}
                  className={selectedMarriage === option ? "selected" : ""}
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
              {selectedOption || "Select an option"}
            </Button>
          </Box>
        </Box>

        <Box sx={styles.buttonGroup}>
          <Button
            sx={styles.resetButton}
            onClick={() => {
              setSelectedGender(null);
              setSelectedMarriage(null);
              setAgeRange([18, 30]);
            }}
          >
            Reset
          </Button>
          <Button sx={styles.searchButton} variant="contained">
            Apply
          </Button>
        </Box>
      </SwipeableDrawer>



      <SwipeableDrawer
        anchor="bottom"
        open={smallDrawerOpen}
        onClose={toggleSmallDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            // borderTopLeftRadius: "20px",
            // borderTopRightRadius: "20px",
            background: "white",
            maxHeight: "90vh",
          }}}
      >
        <List sx={{paddingBottom:0}}>
          {["🎉Casual dating", "💘Long-term", "😍Short-term", "👋New friends", "🎓Study buddy", "🤔Still figuring"].map((option, index) => (
            <ListItemButton key={index} onClick={() => handleOptionSelect(option)} sx={{borderBottom: "1px solid #f0f0f0",}}>
              <ListItemText primary={option} sx={{textAlign:'center'}} />
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>




</>
  );
}

export default AppContainer;
