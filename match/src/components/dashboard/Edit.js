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
  Chip,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Container,
} from "@mui/material";
import SmallLoading from "../login/SmallLoading";
import { useAuth } from "../../AuthProvider";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";


const interests = [
  { emoji: "🎬", label: "Movies" },
  { emoji: "🎶", label: "Music" },
  { emoji: "🏋️‍♂️", label: "Sports" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "✈️", label: "Travel" },
  { emoji: "🍽️", label: "Cooking" },
  { emoji: "🎨", label: "Art" },
  { emoji: "📖", label: "Reading" },
  { emoji: "🥾", label: "Hiking" },
  { emoji: "🖌️", label: "Painting" },
  { emoji: "🧘‍♀️", label: "Yoga" },
  { emoji: "⛺", label: "Camping" },
  { emoji: "🎣", label: "Fishing" },
  { emoji: "💃", label: "Dancing" },
  { emoji: "🏃‍♀️", label: "Running" },
  { emoji: "🚴‍♂️", label: "Cycling" },
  { emoji: "✍️", label: "Writing" },
  { emoji: "🎧", label: "Podcasts" },
  { emoji: "🛍️", label: "Shopping" },
  { emoji: "🏊‍♂️", label: "Swimming" },
  { emoji: "🎲", label: "Boardgames" },
  { emoji: "🕹️", label: "Arcade" },
  { emoji: "💄", label: "Makeup" },
  { emoji: "🌱", label: "Gardening" },
  { emoji: "🏃‍♂️", label: "Fitness" },
  { emoji: "🍰", label: "Baking" },
  { emoji: "🎿", label: "Skiing" },
  { emoji: "🍷", label: "Tasting" },
  { emoji: "🚗", label: "Roadtrip" },
  { emoji: "🐾", label: "Pets" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "💻", label: "Coding" },
  { emoji: "📷", label: "Photography" },
  { emoji: "📺", label: "Streaming" },
  { emoji: "🚢", label: "Cruising" },
  { emoji: "🏕️", label: "Adventure" },
  { emoji: "🛩️", label: "Skydiving" },
  { emoji: "🏎️", label: "Racing" },
  { emoji: "🎭", label: "Acting" },
  { emoji: "🧩", label: "Puzzles" },
  { emoji: "🔭", label: "Astronomy" },
  { emoji: "🎤", label: "Singing" },
  { emoji: "🤹", label: "Juggling" },
  { emoji: "🪂", label: "Paragliding" },
  { emoji: "📡", label: "Tech" },
  { emoji: "🧪", label: "Science" },
];


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
  const {selfprofile, setSelfProfile} = useAuth();
  const [smallDrawerOpen, setSmallDrawerOpen] = React.useState(false);
  const [bigDrawerOpen, setBigDrawerOpen] = React.useState(false);
  const toggleSmallDrawer = (open) => () => setSmallDrawerOpen(open);
  const toggleBigDrawer = (open) => () => setBigDrawerOpen(open);
  const [images, setImages] = React.useState(
    selfprofile?.images?.length > 0 ? [...selfprofile.images] : Array(6).fill(null)
  );  
  const [formData, setFormData] = React.useState({
    reason: selfprofile?.reason || "",
    name: selfprofile?.name || "",
    personality: selfprofile?.personality || "",
    images: selfprofile?.images || [...Array(5).fill(null)],
    bio: selfprofile?.bio || "",
    interests: selfprofile?.interests || [],
  })
  const [selectedGender, setSelectedGender] = React.useState(formData['personality']);
  const [selectedOption, setSelectedOption] = React.useState(formData['reason']);
  const fileInputRefs = React.useRef([]);
  const [loading, setLoading] = React.useState(false)

  if (fileInputRefs.current.length !== 6) {
    fileInputRefs.current = Array(6)
      .fill()
      .map(() => React.createRef());
  }

  const handleImageSelect = (index, event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    setLoading(true)
    
    axios
      .post("https://api.uni-match.in/get_presigned_url", {
        file_name: file.name,
        file_type: file.type,
      })
      .then((response) => {
        const { presigned_url, file_url } = response.data; 

    
        return axios.put(presigned_url, file, {
          headers: { "Content-Type": file.type },
        }).then(() => file_url); 
      })
      .then((file_url) => {
      
        const newtempImages = [...formData["images"]];
        newtempImages[index] = file_url;
        setFormData((prev) => ({ ...prev, images: newtempImages }));

      
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImages = [...images];
          newImages[index] = e.target.result;
          setImages(newImages);
        };
        reader.readAsDataURL(file);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
};


  const handleRemoveImage = (index, event) => {
    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);

    const newtempImages = [...formData["images"]];
    newtempImages[index] = null;
    setFormData((prev) => ({ ...prev, images: newtempImages }));
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].current.value = "";
    }
  };



  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSmallDrawerOpen(false);
  };


  const handleLocationSelect = (location) => {
    setFormData((prev) => {
      return {
        ...prev,
        interests: prev["interests"].includes(location)
          ? prev["interests"].filter((loc) => loc !== location)
          : [...prev["interests"], location],
      };
    });
  };


  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1.5, sm: 2 },
    mb: { xs: 3, sm: 3 },
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


  function handleDone() {
    setLoading(true);
    console.log(formData);
    axios
      .post("https://api.uni-match.in/profile", formData, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        setLoading(false);
        console.log("Message from server: ", response.data);
        navigate("/done", {replace:true})
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
              .post("https://api.uni-match.in/profile", formData, {
                withCredentials: true,
                headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
              })
              .then((response) => {
                setLoading(false);
                console.log("Message from server: ", response.data);
                navigate("/done", {replace:true})
              })
                .catch((retryError) =>
                  console.error("Failed after refresh:", retryError),
                );
            })
            .catch(() =>
              console.error("Session expired, please log in again."),
            );
        }
      })
      .finally(()=>{
        setLoading(false);}
      )
  }
 


  return (<>
    {loading && <SmallLoading />}
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
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Name
          </Typography>
          <TextareaAutosize
           minRows={1}
           value={formData['name']}
           onChange={(e)=> setFormData((prev)=> ({...prev, name:e.target.value}))}
            placeholder="enter name"
            style={{
              //width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #eee",
              fontSize: "16px",
             // color: "#666",
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
      fontSize: "16px",
      fontWeight: 500,
    }}
  >
    Photos
  </Typography>


  <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 1.25, sm: 2.5 },
        }}
      >









{images.map((image, index) => {
  const previewImage = image || formData.images[index]; // Use either local preview or existing URL
  return (
    <Box
      key={index}
      onClick={() => fileInputRefs.current[index].current.click()}
      sx={{
        width: "100%",
        height: "100%",
        aspectRatio: "0.8",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        position: "relative",
        border: "2px dashed #ff97b5",
        backgroundColor: "#fff",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          backgroundColor: "#fff5f8",
        },
        outline: "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        "&:focus": {
          outline: "none",
          boxShadow: "none",
        },
      }}
      tabIndex={-1}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRefs.current[index]}
        onChange={(e) => handleImageSelect(index, e)}
        style={{ display: "none" }}
      />

      {previewImage ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${previewImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Button
            onClick={(e) => handleRemoveImage(index, e)}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              minWidth: "auto",
              padding: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 20, color: "#FF4D4D" }} />
          </Button>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "#FFD6E7" }} />
        </Box>
      )}
    </Box>
  );
})}










      </Box>



</Box>


        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Personality
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {[
              "Introvert",
              "Extrovert",
              "Ambivert",
            ].map((option) => (
              <Chip
              key={option}
              label={option}
              onClick={() => setSelectedGender(option)}
              sx={{
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
              }}
              className={selectedGender === option ? "selected" : ""}
            />
            ))}
          </Box>
        </Box>

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "16px",
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

     <SwipeableDrawer
        anchor="bottom"
        open={smallDrawerOpen}
        onClose={toggleSmallDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: "white",
            maxHeight: "90vh",
          },
        }}
      >
        <List sx={{ paddingBottom: 0 }}>
          {[
            "Casual dating",
            "Long-term",
            "Short-term",
            "New friends",
            "Study buddy",
            "Still figuring",
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

        <Box sx={formGroupStyle}>
          <Typography
            sx={{
              color: "#333",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            About
          </Typography>
          <TextareaAutosize
            minRows={6}
            value={formData['bio']}
            onChange={(e)=> setFormData((prev)=> ({...prev, bio: e.target.value}))}
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
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Interests
          </Typography>
          <Button
            sx={styles.locationSelector}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={toggleBigDrawer(true)}
          >
            your interests
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
          onClick={()=> navigate(-1)}
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
          onClick={handleDone}
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
        open={bigDrawerOpen}
        onClose={toggleBigDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            // borderTopLeftRadius: "20px",
            // borderTopRightRadius: "20px",
            background: "white",
            maxHeight: "90vh",
          },
        }}
      >
          <Box
             sx={{
               display: "grid",
               margin: "30px 0 40px 0",
               gridTemplateColumns: {
                 xs: "repeat(1, 1fr)",
                 sm: "repeat(1, 1fr)",
               },
               gap: { xs: "10px", sm: "15px" },
               padding: "0 25%",
               maxHeight: "",
               overflowY: "auto",
               msOverflowStyle: "none",
               scrollbarWidth: "none",
               "&::-webkit-scrollbar": {
                 display: "none",
               },
             }}
           >
             {interests.map((location) => (
               <Button
                 key={location.label}
                 onClick={() => handleLocationSelect(location.label)}
                 sx={{
                   background: formData["interests"].includes(location.label)
                     ? "rgba(255, 105, 190, 0.4)"
                     : "white",
                   borderRadius: "25px",
                   padding: { xs: "10px", sm: "12px" },
                   textAlign: "center",
                   fontSize: { xs: "14px", sm: "16px" },
                   color: formData["interests"].includes(location.label)
                     ? "white"
                     : "black",
                   transition: "all 0.3s ease",
                   "&:hover": {
                     background: formData["interests"].includes(location.label)
                       ? "rgba(255, 105, 190, 0.4)"
                       : "white",
                   },
                   fontFamily: "inherit",
                   boxShadow: formData["interests"].includes(location.label)
                     ? "0 2px 6px rgba(255, 70, 162, 0.3)"
                     : "none",
                   transform: formData["interests"].includes(location.label)
                     ? "scale(1.02)"
                     : "scale(1)",
                 }}
               >
                 {location.emoji}
                 {location.label}
               </Button>
             ))}
           </Box>
      </SwipeableDrawer>
    </Box>
</>  );
}

export default SearchContainer;