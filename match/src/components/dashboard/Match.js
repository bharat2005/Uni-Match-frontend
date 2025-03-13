import React, { useState, useMemo, useRef, useEffect } from "react"; 
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import { Interests } from "@mui/icons-material";



const db = [
  { reg_no: '12432322', reason: 'Casual Dating', age: 19, name: 'Amit', images: [null, '/12.avif', '/11.jpg', null, null], bio:'hgyg', personality:'extrovert', interests:[] },
  { reg_no: '12432323', reason: 'Serious Relationship', age: 21, name: 'Rahul', images: [null, '/9.jpg','/8.webp', null, null], bio:'iygyu', interests:[] }, 
  { reg_no: '12432324', reason: 'Friendship', age: 22, name: 'Ankit', images: [null, null, '/6.avif', '/7.avif', null], bio:"yguy", interests:[] },
  { reg_no: '12413928', reason: 'Long-term relationship', age: 23, name: 'Bharat',personality:'extrovert', images: [null, '/10.avif', '/4.avif', '/5.jpg', null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles"] }
];

export default function Match({ profiles, setProfiles }) {
  
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
            preventSwipe={['up', 'down', 'left', 'right']}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
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
            bottom: '16%',
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
      transform: "scale(0.95)",
      boxShadow: "0 4px 12px rgba(255, 101, 132, 0.5)",
    },
  }}
>
  <i className="ti ti-x" style={{ fontSize: "60px", color: "white" }} />
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
      transform: "scale(0.95)",
      boxShadow: "0 4px 12px rgba(118, 183, 255, 0.5)",
    },
  }}
>
  <i className="ti ti-heart-filled" style={{ fontSize: "60px", color: "white" }} />
</Button>


        </Box>
      </Box>

    </>
  );
}
