"use client";
import * as React from "react";
import {
  Button,
  IconButton,
  Slider,
  Avatar,
  Typography,
  Box,
  SwipeableDrawer,
  Chip,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";

const styles = {
  appContainer: {
    background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
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
    backgroundColor: "rgba(255, 255, 255, 1)",
    background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
    padding: "20px 20px 20px 20px",
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


const interests = {
    "Movies": {
      icon: <i className="ti ti-movie" style={{ fontSize: "24px" }} />,
      label: "Movies",
      bgcolor: "#ffe4e6", // Soft pinkish-red (matches theme)
      color: "#e11d48"
    },
    "Music": {
      icon: <i className="ti ti-music" style={{ fontSize: "24px" }} />,
      label: "Music",
      bgcolor: "#f3e8ff", // Soft lavender
      color: "#7c3aed"
    },
    "Sports": {
      icon: <i className="ti ti-ball-football" style={{ fontSize: "24px" }} />,
      label: "Sports",
      bgcolor: "#dcfce7", // Soft green
      color: "#15803d"
    },
    "Gaming": {
      icon: <i className="ti ti-device-gamepad-2" style={{ fontSize: "24px" }} />,
      label: "Gaming",
      bgcolor: "#dbeafe", // Soft blue
      color: "#1e40af"
    },
    "Travel": {
      icon: <i className="ti ti-plane" style={{ fontSize: "24px" }} />,
      label: "Travel",
      bgcolor: "#fef2f2", // Soft pinkish-white
      color: "#991b1b"
    },
    "Cooking": {
      icon: <i className="ti ti-chef-hat" style={{ fontSize: "24px" }} />,
      label: "Cooking",
      bgcolor: "#fff7ed", // Soft cream
      color: "#9a3412"
    },
    "Art": {
      icon: <i className="ti ti-palette" style={{ fontSize: "24px" }} />,
      label: "Art",
      bgcolor: "#fde68a", // Soft yellow
      color: "#b45309"
    },
    "Reading": {
      icon: <i className="ti ti-book" style={{ fontSize: "24px" }} />,
      label: "Reading",
      bgcolor: "#f3f4f6", // Soft gray
      color: "#1f2937"
    },
    "Hiking": {
      icon: <i className="ti ti-mountain" style={{ fontSize: "24px" }} />,
      label: "Hiking",
      bgcolor: "#d1fae5", // Light green
      color: "#047857"
    },
    "Painting": {
      icon: <i className="ti ti-brush" style={{ fontSize: "24px" }} />,
      label: "Painting",
      bgcolor: "#e0f2fe", // Light blue
      color: "#0369a1"
    },
    "Yoga": {
      icon: <i className="ti ti-yoga" style={{ fontSize: "24px" }} />,
      label: "Yoga",
      bgcolor: "#fef3c7", // Soft yellow-orange
      color: "#b45309"
    },
    "Camping": {
      icon: <i className="ti ti-tent" style={{ fontSize: "24px" }} />,
      label: "Camping",
      bgcolor: "#fef9c3", // Pale yellow
      color: "#a16207"
    },
    "Fishing": {
      icon: <i className="ti ti-fish" style={{ fontSize: "24px" }} />,
      label: "Fishing",
      bgcolor: "#e0f2fe", // Soft blue
      color: "#0369a1"
    },
    "Dancing": {
      icon: <i className="ti ti-dance" style={{ fontSize: "24px" }} />,
      label: "Dancing",
      bgcolor: "#fde68a", // Soft yellow
      color: "#b45309"
    },
    "Running": {
      icon: <i className="ti ti-run" style={{ fontSize: "24px" }} />,
      label: "Running",
      bgcolor: "#f0fdfa", // Soft teal
      color: "#0f766e"
    },
    "Cycling": {
      icon: <i className="ti ti-bike" style={{ fontSize: "24px" }} />,
      label: "Cycling",
      bgcolor: "#f3f4f6", // Light gray
      color: "#1f2937"
    },
    "Writing": {
      icon: <i className="ti ti-pencil" style={{ fontSize: "24px" }} />,
      label: "Writing",
      bgcolor: "#fce7f3", // Soft pink
      color: "#db2777"
    },
    "Podcasts": {
      icon: <i className="ti ti-microphone" style={{ fontSize: "24px" }} />,
      label: "Podcasts",
      bgcolor: "#e0f2fe", // Soft blue
      color: "#0369a1"
    },
    "Shopping": {
      icon: <i className="ti ti-shopping-cart" style={{ fontSize: "24px" }} />,
      label: "Shopping",
      bgcolor: "#fae8ff", // Light purple
      color: "#9333ea"
    },
    "Fitness": {
      icon: <i className="ti ti-dumbbell" style={{ fontSize: "24px" }} />,
      label: "Fitness",
      bgcolor: "#dcfce7", // Soft green
      color: "#15803d"
    },
    "Coding": {
      icon: <i className="ti ti-code" style={{ fontSize: "24px" }} />,
      label: "Coding",
      bgcolor: "#dbeafe", // Soft blue
      color: "#1e40af"
    },
    "Photography": {
      icon: <i className="ti ti-camera" style={{ fontSize: "24px" }} />,
      label: "Photography",
      bgcolor: "#e0f2fe", // Light blue
      color: "#0369a1"
    },
    "Acting": {
      icon: <i className="ti ti-masks-theater" style={{ fontSize: "24px" }} />,
      label: "Acting",
      bgcolor: "#fef2f2", // Soft red
      color: "#991b1b"
    },
    "Tech": {
      icon: <i className="ti ti-cpu" style={{ fontSize: "24px" }} />,
      label: "Tech",
      bgcolor: "#e0f2fe", // Soft blue
      color: "#0369a1"
    },
    "Science": {
      icon: <i className="ti ti-atom" style={{ fontSize: "24px" }} />,
      label: "Science",
      bgcolor: "#ede9fe", // Soft purple
      color: "#7c3aed"
    },
      "Swimming": {
        icon: <i className="ti ti-swimming" style={{ fontSize: "24px" }} />,
        label: "Swimming",
        bgcolor: "#dbeafe", // Soft blue
        color: "#1e40af"
      },
      "Boardgames": {
        icon: <i className="ti ti-dice" style={{ fontSize: "24px" }} />,
        label: "Boardgames",
        bgcolor: "#fde68a", // Soft yellow
        color: "#b45309"
      },
      "Arcade": {
        icon: <i className="ti ti-gamepad" style={{ fontSize: "24px" }} />,
        label: "Arcade",
        bgcolor: "#f3e8ff", // Light purple
        color: "#7c3aed"
      },
      "Makeup": {
        icon: <i className="ti ti-brush" style={{ fontSize: "24px" }} />,
        label: "Makeup",
        bgcolor: "#fce7f3", // Soft pink
        color: "#db2777"
      },
      "Gardening": {
        icon: <i className="ti ti-leaf" style={{ fontSize: "24px" }} />,
        label: "Gardening",
        bgcolor: "#dcfce7", // Soft green
        color: "#15803d"
      },
      "Baking": {
        icon: <i className="ti ti-cake" style={{ fontSize: "24px" }} />,
        label: "Baking",
        bgcolor: "#fef3c7", // Soft yellow-orange
        color: "#b45309"
      },
      "Skiing": {
        icon: <i className="ti ti-snowflake" style={{ fontSize: "24px" }} />,
        label: "Skiing",
        bgcolor: "#e0f2fe", // Light blue
        color: "#0369a1"
      },
      "Tasting": {
        icon: <i className="ti ti-wine" style={{ fontSize: "24px" }} />,
        label: "Tasting",
        bgcolor: "#fef2f2", // Soft red-pink
        color: "#991b1b"
      },
      "Roadtrip": {
        icon: <i className="ti ti-car" style={{ fontSize: "24px" }} />,
        label: "Roadtrip",
        bgcolor: "#fff7ed", // Soft cream
        color: "#9a3412"
      },
      "Pets": {
        icon: <i className="ti ti-paw" style={{ fontSize: "24px" }} />,
        label: "Pets",
        bgcolor: "#fef9c3", // Pale yellow
        color: "#a16207"
      },
      "Fashion": {
        icon: <i className="ti ti-shirt" style={{ fontSize: "24px" }} />,
        label: "Fashion",
        bgcolor: "#fae8ff", // Light purple
        color: "#9333ea"
      },
      "Streaming": {
        icon: <i className="ti ti-device-tv" style={{ fontSize: "24px" }} />,
        label: "Streaming",
        bgcolor: "#dbeafe", // Soft blue
        color: "#1e40af"
      },
      "Cruising": {
        icon: <i className="ti ti-ship" style={{ fontSize: "24px" }} />,
        label: "Cruising",
        bgcolor: "#e0f2fe", // Light blue
        color: "#0369a1"
      },
      "Adventure": {
        icon: <i className="ti ti-compass" style={{ fontSize: "24px" }} />,
        label: "Adventure",
        bgcolor: "#fef3c7", // Soft yellow-orange
        color: "#b45309"
      },
      "Skydiving": {
        icon: <i className="ti ti-parachute" style={{ fontSize: "24px" }} />,
        label: "Skydiving",
        bgcolor: "#fde68a", // Soft yellow
        color: "#b45309"
      },
      "Racing": {
        icon: <i className="ti ti-flag-checkered" style={{ fontSize: "24px" }} />,
        label: "Racing",
        bgcolor: "#e0f2fe", // Soft blue
        color: "#0369a1"
      },
      "Puzzles": {
        icon: <i className="ti ti-puzzle" style={{ fontSize: "24px" }} />,
        label: "Puzzles",
        bgcolor: "#fef9c3", // Pale yellow
        color: "#a16207"
      },
      "Astronomy": {
        icon: <i className="ti ti-telescope" style={{ fontSize: "24px" }} />,
        label: "Astronomy",
        bgcolor: "#e0e7ff", // Light lavender
        color: "#4f46e5"
      },
      "Singing": {
        icon: <i className="ti ti-microphone" style={{ fontSize: "24px" }} />,
        label: "Singing",
        bgcolor: "#f3e8ff", // Soft lavender
        color: "#7c3aed"
      },
      "Juggling": {
        icon: <i className="ti ti-confetti" style={{ fontSize: "24px" }} />,
        label: "Juggling",
        bgcolor: "#fde68a", // Soft yellow
        color: "#b45309"
      },
      "Paragliding": {
        icon: <i className="ti ti-wind" style={{ fontSize: "24px" }} />,
        label: "Paragliding",
        bgcolor: "#e0f2fe", // Soft blue
        color: "#0369a1"
    }
  
  
  
  };
  


const profile =   { reg_no: '12413928', reason: 'Long-term relationship', age: 23, name: 'Bharat',personality:'extrovert', images: [null, '/10.avif', '/4.avif', '/5.jpg', null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles", "Astronomy", "Juggling",   "Art"  ] };

function AppContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState("不限");
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [selectedMarriage, setSelectedMarriage] = React.useState("不限");
   const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [ageRange, setAgeRange] = React.useState([18, 23]);
  const list = profile.images.filter(item => item != null);

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


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  };




  function emoji() {
    switch (profile.reason) {
      case "Casual Dating":
        return "🎉";
      case "Short-term fun":
        return "😍";
      case "Long-term relationship":
        return "💘";
      case "New friends":
        return "👋";
      case "Study buddy":
        return "📚";
      case "Still figuring it out":
        return "🤔";
      default:
        return "";
    }
  }



  return (<>
  <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
/> 


      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          height: '100vh',
          //width:'100vw',
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "20px",
           borderTopRightRadius: "20px",
            background: "white",
            maxHeight: "90vh",
            height: '100vh', // Ensures the drawer fills the viewport
            overflow: 'hidden',
           // width:'100vw'
          }}}
        disableSwipeToOpen={false}
      >


<Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '50%', // Cover top half of drawer
      zIndex: 5,
      backgroundColor:'red',
      // backgroundImage: true
      //   ? `url(/10.avif)`
      //   : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: imageLoaded ? 1 : 0,
      transition: 'opacity 0.1s ease',
    }}
  >
    {/* Left Arrow */}
    <IconButton
      sx={{
        position: 'absolute',
        top: '50%',
        left: '20px',
        transform: 'translateY(-50%)',
        color: '#fff',
      }}
      onClick={(e) => {
        e.stopPropagation();
        prevImage();
      }}
    >
      <ArrowBackIos />
    </IconButton>

    {/* Right Arrow */}
    <IconButton
      sx={{
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: 'translateY(-50%)',
        color: '#fff',
      }}
      onClick={(e) => {
        e.stopPropagation();
        nextImage();
      }}
    >
      <ArrowForwardIos />
    </IconButton>

    {/* Dots Indicator */}
    <Box
      sx={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
      }}
    >
      {[null].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: '48px',
            height: '4px',
            borderRadius: '15%',
            backgroundColor: index === currentImageIndex ? '#fff' : '#888',
            opacity: index === currentImageIndex ? 1 : 0.5,
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </Box>
  </Box>











        <Box component="form" sx={{
    backgroundColor: "rgba(255, 255, 255, 1)",
    background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
    padding: "20px 20px 20px 20px",
    position: 'absolute',
    top: '50%', // Start at the middle of the drawer
    left: 0,
    width: '100%',
    height: '50%', // Take bottom half
    overflowY: 'auto', // Allow scrolling if content overflows
    //backgroundColor: '#fff',
    //borderRadius: '24px 24px 24px 24px',
    //padding: '16px',
    //boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
  }}>
        <Box sx={{ mb: 1.25 }}>
          <Typography sx={{ fontSize:"28px", fontWeight: 700, mb: 1.25 }}>
            {profile.name}, {profile.age}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>


            <Chip 
            icon={<i className={profile.gender == "female"? "ti ti-gender-female":"ti ti-gender-male"}
            style={{ fontSize: "24px", color:'white'}} />}  label={profile.gender=="female"? "Female":"Male"} 
            sx={{ bgcolor:profile.gender =="female"? "#FE6BA2":'#7270F5', color:"white", borderRadius: "8px", fontSize:'14px' }} 
            />

            <Chip 
            icon={profile.personality=="extrovert" ? <i className="ti ti-sun-filled" style={{ fontSize: "18px", color: 'white'}} /> : profile.personality == "introvert"?<i className="ti ti-moon-filled" style={{ fontSize: "18px", color: 'white'}} />:<i className="ti ti-seedling-filled" style={{ fontSize: "18px", color: 'white'}} /> }  
            label={profile.personality === "extrovert" ? "Extrovert" : profile.personality === "introvert" ? "Introvert" : "Ambivert"} 
            sx={{ 
              bgcolor: profile.personality === "extrovert" ? "#FF5C5C" : profile.personality === "introvert" ? "#8A2BE2" : "#32CD32", 
              color: "white", 
              borderRadius: "8px", 
              fontSize: '14px' 
            }} 
            />

            <Chip 
            icon={<i className="ti ti-user-filled" 
            style={{ fontSize: "18px", color:'white'}} />}  
            label={profile.reg_no} 
            sx={{ bgcolor:"#ffc107", color:"white", borderRadius: "8px", fontSize:'14px' }} 
            />


            {profile.reg_no=="12413923"&& 
            <Chip 
            icon={<i className="ti ti-settings" 
            style={{ fontSize: "18px", color:'white'}} />}  
            label="Developer" sx={{ bgcolor:"#6A0DAD  ", color:"white", borderRadius: "8px", fontSize:'14px' }} 
            />}



          </Box>
        </Box>

    
        <Typography variant="body2" sx={{ color: "#666", my: 1.25 }}>
         {emoji()}{profile.reason}
        </Typography>


        <Box sx={{ mt: 2, backgroundColor: "#FFFFFF",borderRadius: "24px", }}>
          <Typography sx={{ p:1, fontWeight: 520,pl:2, fontSize:'20px' }}>
            About
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              overflowX: "auto",
              p: 2,
              pt:0,
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >  
          {profile.bio}
        </Box></Box>



        <Box sx={{ mt: 2 , backgroundColor: "#FFFFFF",borderRadius: "24px", }}>
          <Typography sx={{ p:1, fontWeight: 520,pl:2, fontSize:'20px' }}>
            Interests
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              overflowX: "auto",
              p: 2,
              pt:0,
          
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              whiteSpace: "nowrap",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >  
            {profile.interests.map((item, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 45, height: 45, bgcolor: interests[item].bgcolor, color: interests[item].color, fontSize:'26px' }}>
                  {interests[item].icon}
                </Avatar>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {interests[item].label}
                </Typography>
              </Box>
            ))}
          </Box>


   </Box>
        </Box>
      </SwipeableDrawer>
 </> );
}

export default AppContainer;
