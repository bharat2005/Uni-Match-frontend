import React, { useState, useMemo, useRef, useEffect } from "react"; 
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import { Interests } from "@mui/icons-material";
import Filter from './Filter';




const db = [
  { reg_no: '12432322', reason: 'Casual Dating', age: 19, name: 'Yuki', images: [null, "9.jpg", '/10.jpg', '/11.jpg', null], bio:'I love sunny days all time!!!', personality:'extrovert', interests:["Gardening", "Paragliding","Puzzles","Juggling","Art", "Juggling"] },
  { reg_no: '12432323', reason: 'Serious Relationship', age: 19, name: 'May', images: [null, '/7.jpg','/8.jpg', null, null], bio:'Spring is my vibe, i love greenery!', interests:["Gardening", "Paragliding","Puzzles","Juggling","Art", "Juggling"] }, 
  { reg_no: '12432324', reason: 'Friendship', age: 21, name: 'Misaki', images: [null, null, '/4.jpg', '/5.jpg', '/6.jpg'], bio:"Just enjoying the life as much as possible!!", interests:["Gardening", "Paragliding","Puzzles","Juggling","Art", "Juggling"] },
  { reg_no: '12413928', reason: 'Long-term relationship', age: 20, name: 'Jisoo',personality:'extrovert', images: ["/2.jpg", '/3.jpg', '/1.jpg', null, null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles","Juggling","Art", "Juggling"] }
];

export default function Match({ profiles, setProfiles, isDrawerOpen, setIsDrawerOpen, setActiveTab }) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);
  


  const childRefs = useMemo(
    () => Array(db.length).fill(0).map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  const swiped = (direction, nameToDelete, index) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < db.length) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <>
       <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            //marginBottom:'5%',
            padding: { xs: "16px", sm: "20px" },
            color: "#000",
          }}
        >
          <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
            }}
          >
            <IconButton
            sx={{ margin:0,
              padding:0,}}
           
             >
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30px",
      height: "46px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent", // Transparent background
      transition: "background-color 0.3s ease-in-out",
    }}
  >
    <i
      className="ti ti-clover-filled"
      style={{
        fontSize: "24px",
        background: "linear-gradient(145deg, #ff3c78 0%, #ff79b0 30%, #b985ff 70%, #5caeff 100%)",
        WebkitBackgroundClip: "text", // Clip background to text
        WebkitTextFillColor: "transparent", // Make text transparent to show gradient
        transition: "background 0.3s ease-in-out",
      }}
    />
  </Box>
</IconButton>    
<img
onClick={() => setActiveTab("clover")}
      src="/Uni-match-14-3-2025.png" // Replace with your image path
      alt="clover"
      style={{
        height: "42px",
        objectFit: "cover",}}
    />
          </Box>





          <IconButton  onClick={()=> setIsDrawerOpen(true)}>
            <i
              className="ti ti-adjustments-horizontal"
              style={{ fontSize: "26px", color:'black' }}
            />
          </IconButton>
        </Box>


      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          //background:'linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)', 
          position: 'relative',
        }}
      >
        {/* Conditional rendering of the image when imageClick is true */}
        
        {db.map((profile, index) => (
          <TinderCard
            className="swipe"
            key={profile.reg_no}
            ref={childRefs[index]}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
            swipeRequirementType="position"
            swipeThreshold={200}
            flickOnSwipe={true}
          >
            <Card profile={profile}   />
          </TinderCard>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          gap={12}
          sx={{
            position: 'absolute',
            bottom: "15%",
            zIndex: 1,
          }}
        >
<Button 
  variant="contained"
  onClick={() => swipe("left")}
  sx={{
    background: "linear-gradient(145deg, #FF8BA7 0%, #FF6584 50%, #FF4D6D 100%)", // Softer but striking gradient
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    boxShadow: "0 8px 24px rgba(255, 101, 132, 0.3)",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",

    "&:focus": {
      boxShadow: "0 8px 24px rgba(255, 101, 132, 0.3)",
    },
    "&:active": {
      transform: "scale(0.8)",
      boxShadow: "0 4px 12px rgba(255, 101, 132, 0.5)",
    },
  }}
>
  <i className="ti ti-x" style={{ fontSize: "75px", color: "white" }} />
</Button>

<Button
  variant="contained"
  onClick={() => swipe("right")}
  sx={{
    background: "linear-gradient(145deg, #A0D8FF 0%, #76B7FF 40%, #4A90E2 100%)", // Softer and more balanced blue
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    boxShadow: "0 8px 24px rgba(118, 183, 255, 0.3)",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",

    "&:focus": {
      boxShadow: "0 8px 24px rgba(118, 183, 255, 0.3)",
    },
    "&:active": {
      transform: "scale(0.8)",
      boxShadow: "0 4px 12px rgba(118, 183, 255, 0.5)",
    },
  }}
>
  <i className="ti ti-heart-filled" style={{ fontSize: "75px", color: "white" }} />
</Button>


        </Box>
      </Box>
<Filter isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
    </>
  );
}
