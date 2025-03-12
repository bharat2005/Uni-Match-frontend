import React, { useState, useMemo, useRef, useEffect } from "react"; 
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import Drawer from './Drawer';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ArrowBackIos, ArrowForwardIos  } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const db = [
  { reg_no: '12432322', reason: 'Casual Dating', age: 19, name: 'Amit', images: [null, null, '/2.jpg', '/1.jpg', null, null] },
  { reg_no: '12432323', reason: 'Serious Relationship', age: 21, name: 'Rahul', images: [null, null, '/2.jpg', '/1.jpg', null, null] },
  { reg_no: '12432324', reason: 'Friendship', age: 22, name: 'Ankit', images: [null, null, '/2.jpg', '/1.jpg', null, null] },
  { reg_no: '12432325', reason: 'Networking', age: 23, name: 'Bharat', images: [null, null, '/2.jpg', '/1.jpg', null, null] }
];

export default function Match({ profiles, setProfiles }) {
  const [imageClick, setImageClick] = React.useState(null);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageClick) {
      setTimeout(() => setImageLoaded(true), 10); // Trigger pop-in effect
    } else {
      setImageLoaded(false); // Trigger pop-out effect
    }
  }, [imageClick]);




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
          position: 'relative',
        }}
      >
        {/* Conditional rendering of the image when imageClick is true */}
        {imageClick && (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: imageLoaded ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 100%) scale(0.9)',
          width: '100vw',
          height: '60vh',
          zIndex: 8,
          backgroundImage: 'url(/2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease, transform 0.4s ease',
        }}
      >
        {/* ArrowBackIos Icon */}
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
            // Add logic for back navigation
          }}
        >
          <ArrowBackIos fontSize="medium" />
        </IconButton>


        {/* ArrowForwardIos Icon */}
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
            // Add logic for forward navigation
          }}
        >
          <ArrowForwardIos fontSize="medium" />
        </IconButton>

        {/* ChevronLeft Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: '#fff',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setImageClick(false);
          }}
        >
          <ArrowBackIcon  fontSize="large" />
        </IconButton>
      </Box>
    )}

        {db.map((profile, index) => (
          <TinderCard
            className="swipe"
            key={profile.reg_no}
            ref={childRefs[index]}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, profile.name, index)}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
          >
            <Card profile={profile} setImageClick={setImageClick} />
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
              background: "linear-gradient(145deg, #ff7aa7 0%, #ff6a9c 50%, #ff4d74 100%)",
              borderRadius: "50%",
              width: "90px",
              height: "90px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(145deg, #ff6a9c 0%, #ff4d74 70%)",
                boxShadow: "0 4px 20px rgba(255, 0, 0, 0.3)",
              },
              "&:focus": {
                boxShadow: "0 4px 20px rgba(255, 0, 0, 0.3)",
              },
              "&:active": {
                transform: "scale(0.9)",
                boxShadow: "0 2px 10px rgba(255, 0, 0, 0.4)",
              },
            }}
          >
            <i className="ti ti-x" style={{ fontSize: "50px", color: "white" }} />
          </Button>

          {/* Right Swipe Button */}
          <Button
            variant="contained"
            onClick={() => swipe("right")}
            sx={{
              background: "linear-gradient(145deg, #94c9ff 0%, #6fafff 40%, #4a90e2 100%)",
              borderRadius: "50%",
              width: "90px",
              height: "90px",
              boxShadow: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(145deg, #6fafff 0%, #4a90e2 70%)",
                boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)",
              },
              "&:focus": {
                boxShadow: "0 4px 20px rgba(0, 255, 255, 0.3)",
              },
              "&:active": {
                transform: "scale(0.9)",
                boxShadow: "0 2px 10px rgba(0, 255, 255, 0.4)",
              },
            }}
          >
            <i className="ti ti-heart-filled" style={{ fontSize: "50px", color: "white" }} />
          </Button>
        </Box>
      </Box>
      <Drawer imageClick={imageClick}/>
    </>
  );
}
