"use client";
import * as React from "react";
import {
  Button,
  IconButton,
  Slider,
  Typography,
  Box,
  SwipeableDrawer,
  Chip,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const styles = {
  appContainer: {
    background: "linear-gradient(135deg, #ffe5f2, #e5f0ff)",
    minHeight: "100vh",
    fontFamily: '"Noto Sans SC", sans-serif',
  },
  drawer: {
    "& .MuiDrawer-paper": {
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      background: "white",
      maxHeight: "90vh",
    },
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
    marginTop: "40px",
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
    "&:hover": {
      backgroundColor: "#ff5b8c",
    },
  },
};

function AppContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [smallDrawerOpen, setSmallDrawerOpen] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState("不限");
  const [selectedPersonality, setSelectedPersonality] = React.useState("不限");
  const [ageRange, setAgeRange] = React.useState([18, 23]);
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  const toggleDrawer = (open) => () => setIsDrawerOpen(open);
  const toggleSmallDrawer = (open) => () => setSmallDrawerOpen(open);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSmallDrawerOpen(false);
  };

  // Generate six random values for dropdown
  const randomOptions = React.useMemo(() => {
    return Array.from({ length: 6 }, () =>
      Math.random().toString(36).substring(7)
    );
  }, []);

  return (
    <Box sx={styles.appContainer}>
      {/* Main Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={styles.drawer}
      >
        {/* Drawer Content */}
        <Box sx={styles.drawerContent}>
          {/* Age Slider */}
          <Box sx={styles.formGroup}>
            <Typography sx={styles.label}>Age</Typography>
            <Slider
              value={ageRange}
              onChange={handleAgeChange}
              valueLabelDisplay="auto"
              min={18}
              max={30}
            />
          </Box>

          {/* Gender Selector */}
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

          {/* Personality Selector */}
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

          {/* Looking For (Dropdown) */}
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
      </SwipeableDrawer>

      {/* Small Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={smallDrawerOpen}
        onClose={toggleSmallDrawer(false)}
        sx={styles.drawer}
      >
        <List>
          {randomOptions.map((option, index) => (
            <ListItemButton key={index} onClick={() => handleOptionSelect(option)}>
              <ListItemText primary={option} />
            </ListItemButton>
          ))}
        </List>
      </SwipeableDrawer>
    </Box>
  );
}

export default AppContainer;
