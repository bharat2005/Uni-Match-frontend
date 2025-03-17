"use client";
import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  TextareaAutosize,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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

function SearchContainer({ onClose, setIsDrawerOpen }) {
  const navigate = useNavigate();
  const [gender, setGender] = React.useState("any");
  const [education, setEducation] = React.useState("");

  const [smallDrawerOpen, setSmallDrawerOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState("");

  const toggleSmallDrawer = (open) => () => setSmallDrawerOpen(open);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSmallDrawerOpen(false);
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

  const containerStyle = {
    bgcolor: "white",
    borderRadius: "20px 20px 0 0",
    p: { xs: "16px", sm: "20px" },
    position: "relative",
    maxWidth: "600px",
    mx: "auto",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    mb: { xs: 3, sm: 3.75 },
    height: "44px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.5, sm: 2 },
    mb: { xs: 2.5, sm: 3 },
  };

  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: { xs: 1, sm: 1.5 },
    width: "100%",
  };

  const uploadBoxStyle = {
    aspectRatio: "1",
    border: "1px dashed #ddd",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    bgcolor: "#f9f9f9",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: "#f5f5f5",
      borderColor: "#ccc",
    },
  };

  const genderButtonStyle = (isSelected) => ({
    px: { xs: 2, sm: 3 },
    py: { xs: 0.75, sm: 1 },
    borderRadius: "20px",
    border: "1px solid #eee",
    color: "#666",
    fontSize: "14px",
    bgcolor: isSelected ? "#f5f5f5" : "white",
    "&:hover": {
      bgcolor: isSelected ? "#f0f0f0" : "#fafafa",
      borderColor: "#ddd",
    },
    textTransform: "none",
    minWidth: "80px",
  });

  const inputBaseStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: "14px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ddd",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#eee",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ff6b9c",
        borderWidth: "1px",
      },
    },
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FAFAFA",
        fontFamily: '"Inter", sans-serif',
        zIndex: 9,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px 12px 20px",
          position: "sticky",
          top: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 10,

          borderBottom: "1px solid #E0E0E0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 16,
            color: "#333",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
          onClick={()=> navigate(-1)}
        >
          <i
            className="ti ti-chevron-left"
            style={{ fontSize: "20px", color: "#555" }}
          />
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          Edit Profile
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
          textAlign: "left",
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            placeholder="enter name"
            size="small"
            sx={inputBaseStyle}
          />
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Photos
          </Typography>
          <Box sx={imageGridStyle}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Box key={index} sx={uploadBoxStyle} role="button" tabIndex={0}>
                  <AddIcon
                    sx={{
                      fontSize: 24,
                      color: "#999",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "#666",
                      },
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Personality
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {[
              { value: "any", label: "Introvert" },
              { value: "male", label: "Extrovert" },
              { value: "female", label: "Ambivert" },
            ].map((option) => (
              <Button
                key={option.value}
                variant="outlined"
                sx={genderButtonStyle(gender === option.value)}
                onClick={() => setGender(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Here for?
          </Typography>

          <Button
            sx={styles.locationSelector}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={toggleSmallDrawer(true)}
          >
            {selectedOption || "Select an option"}
          </Button>
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            About
          </Typography>
          <TextareaAutosize
            minRows={4}
            placeholder="A few words about yourself..."
            style={{
              //width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #eee",
              fontSize: "14px",
              color: "#666",
              resize: "vertical",
              fontFamily: "inherit",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#ff6b9c";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#eee";
            }}
          />
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Interests
          </Typography>
          <Button
            sx={styles.locationSelector}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={toggleSmallDrawer(true)}
          >
            {selectedOption || "Select an option"}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          width: "100%",

          gap: 1,
          position: "sticky",
          bottom: 0,
          backgroundColor: "#FFFFFF",
          padding: "12px 16px",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.05)",
          borderTop: "1px solid #E0E0E0",
          justifyContent: "center",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{
            padding: "8px 20px",
            py: 1.5,
            borderRadius: "25px",
            borderColor: "#eee",
            color: "#666",
            fontSize: "14px",
            "&:hover": {
              borderColor: "#ddd",
              bgcolor: "#fafafa",
            },
            textTransform: "none",
            transition: "all 0.2s ease",
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,

            borderRadius: "25px",
            bgcolor: "#ff6b9c",
            fontSize: "14px",
            "&:hover": {
              bgcolor: "#ff5c8f",
            },
            textTransform: "none",
            boxShadow: "none",
            transition: "all 0.2s ease",
          }}
        >
          Save
        </Button>
      </Box>

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
          },
        }}
      >
        <List sx={{ paddingBottom: 0 }}>
          {[
            "🎉Casual dating",
            "💘Long-term",
            "😍Short-term",
            "👋New friends",
            "🎓Study buddy",
            "🤔Still figuring",
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
    </Box>
  );
}

export default SearchContainer;
