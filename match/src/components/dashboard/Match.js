import React, { useState, useMemo, useRef, useEffect } from "react";
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import Filter from "./Filter";
import axios from "axios";


export default function Match() {
  const [profiles, setProfiles] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [cardStates, setCardStates] = useState([]);

  useEffect(() => {
    axios.get("https://api.uni-match.in/matchcomp",{
      withCredentials: true,
      headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
    }, ) 
      .then((response) => {
        console.log(response.data)
        setProfiles(response.data.cards);  
        setCurrentIndex(response.data.cards.length - 1); 
        setCardStates(Array(response.data.cards.length).fill(null));
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  const childRefs = useMemo(() => profiles.map(() => React.createRef()), [profiles]);


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0 && profiles.length > 0;

  const sendSwipeData = (direction, targetRegNo) => {
    if (direction === "right") {
      axios.post("https://api.uni-match.in/swipeadd", {
        target_reg_no: targetRegNo,
        swipe_action: direction,
      }, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
        .then(() => {
          console.log("Swipe data sent successfully");
        })
        .catch((error) => {
          console.error("Error sending swipe data:", error);
        });
    }
  };

 const swiped = (direction, profile, index) => {
    setCardStates((prev) => {
      const newState = [...prev];
      newState[index] = direction;
      return newState;
    });
    
    if (direction === "right") {
      sendSwipeData(direction, profile.reg_no);
    }
    
    updateCurrentIndex(index - 1);
    setTimeout(() => {
      setCardStates((prev) => {
        const newState = [...prev];
        newState[index] = null;
        return newState;
      });
    }, 500);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < profiles.length) {
      setTimeout(()=> childRefs[currentIndex].current.swipe(dir), 300);
    }
  };

  return (
    <>



        <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              zIndex: 0,
              padding:"4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <IconButton sx={{ margin: 0, padding: 0 }}>
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
                      background:
                        "linear-gradient(145deg, #ff3c78 0%, #ff79b0 30%, #b985ff 70%, #5caeff 100%)",
                      WebkitBackgroundClip: "text", // Clip background to text
                      WebkitTextFillColor: "transparent", // Make text transparent to show gradient
                      transition: "background 0.3s ease-in-out",
                    }}
                  />
                </Box>
              </IconButton>
              <img
                src="/Uni-match-14-3-2025.png" // Replace with your image path
                alt="clover"
                style={{
                  height: "42px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <i
                className="ti ti-adjustments-horizontal"
                style={{ fontSize: "28px", color: "black" }}
              />
            </IconButton>
          </Box>
        









      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          position: "relative",
        }}
      >
        {/* Conditional rendering of the image when imageClick is true */}

        {profiles.map((profile, index) => (
          <TinderCard
            className="swipe"
            key={profile.reg_no}
            ref={childRefs[index]}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => {swiped(dir, profile, index); }}
            onCardLeftScreen={() => outOfFrame(profile.name, index)}
            swipeRequirementType="position"
            swipeThreshold={200}
            flickOnSwipe={true}
          >
            <Card profile={profile} cardDir={cardStates[index]} isActive={index === currentIndex} />
          </TinderCard>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          gap={12}
          sx={{
            position: "absolute",
            bottom: "15%",
            zIndex: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => swipe("left")}
            sx={{
              background:
                "linear-gradient(145deg, #FF006E 0%, #FB5607 50%, #FFBE0B 100%)", // More vibrant gradient
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              boxShadow: "0 8px 24px rgba(255, 0, 110, 0.6)", // Increased shadow intensity for more pop
              backdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s ease",

              "&:focus": {
                boxShadow: "0 8px 24px rgba(255, 0, 110, 0.8)", // Stronger focus effect
              },
              "&:active": {
                transform: "scale(0.8)", // Less shrink to feel more natural
                boxShadow: "0 4px 12px rgba(255, 0, 110, 0.9)", // More intense active shadow
              },
            }}
          >
            <i
              className="ti ti-x"
              style={{ fontSize: "60px", color: "white" }}
            />
          </Button>

          <Button
            variant="contained"
            onPointerUp={() => swipe("right")}
            sx={{
              background:
                "linear-gradient(145deg, #00C853 0%, #B2FF59 50%, #FFD600 100%)", // Vibrant green to lime to yellow
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              boxShadow: "0 8px 24px rgba(0, 200, 83, 0.6)", // Fresh green glow
              backdropFilter: "blur(12px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.2s ease",

              "&:focus": {
                boxShadow: "0 8px 24px rgba(0, 200, 83, 0.8)", // Strong green glow on focus
              },
              "&:active": {
                transform: "scale(0.8)", // Consistent shrink effect
                boxShadow: "0 4px 12px rgba(0, 200, 83, 0.9)", // Punchy feedback
              },
            }}
          >
            <i
              className="ti ti-heart-filled"
              style={{ fontSize: "60px", color: "white" }}
            />
          </Button>
        </Box>
        <Filter isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </Box>
    </>
  );
}
