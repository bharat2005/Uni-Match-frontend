import React, { useState, useMemo, useRef, useEffect } from "react";
import "../../App.css";
import { Box, Button, IconButton } from "@mui/material";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import Filter from "./Filter";
import axios from "axios";
import CenterLoading from "./CenterLoading";
import NoSuchProfiles from "./NoSuchProfiles";
import { Interests } from "@mui/icons-material";
import NotiModal from "./NotiModal";

export default function Match() {
  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cardStates, setCardStates] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const currentIndexRef = useRef(currentIndex);
  const [childRefs, setChildRefs] = useState([]);

  useEffect(() => {
    setIsReady(false);
    axios
      .get(`https://api.uni-match.in/matchcomp?page=${page}`, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setProfiles(response.data.cards);
        setCurrentIndex(response.data.cards.length - 1);
        setCardStates(Array(response.data.cards.length).fill(null));
        setHasNext(response.data.has_next);
        console.log("page1",page)
        setPage((prev) => (response.data.has_next==true ? prev + 1 : 1));
        console.log("page",page)
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
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
                .get("https://api.uni-match.in/matchcomp", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  setProfiles(response.data.cards);
                  setCurrentIndex(response.data.cards.length - 1);
                  setCardStates(Array(response.data.cards.length).fill(null));
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
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  useEffect(() => {
    setChildRefs((prev) =>
      Array(profiles.length)
        .fill(null)
        .map((_, i) => prev[i] || React.createRef())
    );
  }, [profiles]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < profiles.length - 1;
  const canSwipe = currentIndex >= 0;

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
      updateCurrentIndex(index - 1);
      
      // If no more cards left, load more profiles
      if (index - 1 < 0 && hasNext) {
        loadMoreProfiles();
      }
    }, 600);
  };
  
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (childRefs[idx] && childRefs[idx].current) {
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    }
  };
  const swipe = async (dir) => {
    if (canSwipe && currentIndex >= 0 && currentIndex < childRefs.length) {
      await childRefs[currentIndex]?.current?.swipe(dir);
    }
  };
  const goBack = async () => {
    if (!canGoBack) return
    setCardStates((prev) => {
      const newState = [...prev];
      newState[newIndex] = null;
      return newState;
    });

    const newIndex = currentIndex + 1;

    if (cardStates[newIndex] !== "left") return; 

    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard();
  }
  const sendSwipeData = (direction, targetRegNo) => {
    if (direction === "right") {
      axios
        .post(
          "https://api.uni-match.in/swipeadd",
          {
            target_reg_no: targetRegNo,
            swipe_action: direction,
          },
          {
            withCredentials: true,
            headers: {
              "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
            },
          },
        )
        .then(() => {
          console.log("Swipe data sent successfully");
        })
        .catch((error) => {
          console.error("Error sending swipe data:", error);
        });
    }
  };
  const loadMoreProfiles = () => {
    setIsReady(false);
      axios
      .get(`https://api.uni-match.in/matchcomp?page=${page}`, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setProfiles(response.data.cards);
        setCurrentIndex(response.data.cards.length - 1);
        setCardStates(Array(response.data.cards.length).fill(null));

        setHasNext(prev => response.data.has_next)
        setPage(prev => hasNext ? prev+1 : 1)

        console.log("page",page)
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);

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
                .get("https://api.uni-match.in/matchcomp", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  setProfiles(response.data.cards);
                  setCurrentIndex(response.data.cards.length - 1);
                  setCardStates(Array(response.data.cards.length).fill(null));
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
      .finally(() => {
        setIsReady(true);
      });
    
    }
  

  return (
    <>
    <NotiModal
    modalOpen={modalOpen}
    setModalOpen={setModalOpen}
    />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          zIndex: 0,
          padding: "4px",
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
        <img src="/beta.png" style={{ height: "15px", position:'relative', top:6 }} />
        </Box>
        <IconButton
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <i
            className="ti ti-adjustments-horizontal"
            style={{ fontSize: "28px", color: "black" }}
          />
        </IconButton>
      </Box>

      {isReady ? (
        <>
          {profiles.length ? (
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
                  preventSwipe={["up", "down", "right", "left"]}
                  onSwipe={(dir) => {
                    swiped(dir, profile, index);
                  }}
                  onCardLeftScreen={() => outOfFrame(profile.name, index)}
                  // swipeRequirementType="position"
                  // swipeThreshold={150}
                  // flickOnSwipe={true}
                >
                  <Card
                    profile={profile}
                    cardDir={cardStates[index]}
                    isActive={index === currentIndex}
                  />
                </TinderCard>
              ))}

              <Box
                gap={4}
                sx={{
                  position: "fixed",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:'center',
                  bottom: "10%",
                  width:'100vw',
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
                    width: "110px",
                    height: "110px",
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
                    style={{ fontSize: "70px", color: "white" }}
                  />
                </Button>

                <Button
                  variant="contained"
                  onPointerUp={() => goBack()}
                  sx={{
                    background:
                      "linear-gradient(145deg, #FFEE58 0%, #FFC107 50%, #FFF8E1 100%)", // Soft pastel yellow → Warm honey → Cream white
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    boxShadow: "0 10px 30px rgba(255, 224, 130, 0.6)", // Softer golden glow
                    backdropFilter: "blur(14px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease-out",
                    transform: "scale(1)",

                    "&:hover": {
                      transform: "scale(1.1) rotate(-3deg)", // Playful pop effect
                      boxShadow: "0 12px 36px rgba(255, 224, 130, 0.8)", // Brighter glow
                    },
                    "&:active": {
                      transform: "scale(0.85)", // Squishy press effect
                      boxShadow: "0 6px 18px rgba(255, 224, 130, 0.9)", // Comfy pressed look
                    },
                  }}
                >
                  <i
                    className="ti ti-rotate"
                    style={{
                      fontSize: "50px",
                      color: "white",
                      filter:
                        "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.8))", // Cute inner glow
                    }}
                  />
                </Button>

                <Button
                  variant="contained"
                  onPointerUp={() => swipe("right")}
                  sx={{
                    background:
                      "linear-gradient(145deg, #00C853 0%, #B2FF59 50%, #FFD600 100%)", // Vibrant green to lime to yellow
                    borderRadius: "50%",
                    width: "110px",
                    height: "110px",
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
                    style={{ fontSize: "70px", color: "white" }}
                  />
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Lighter look for placeholders
            }}
          >
            <img src={"/empty-search.png"} style={{ width: "120px" }} />
            <Box
              sx={{
                fontSize: "18px",
                color: "#888", // Typical gray placeholder color
              }}
            >
              No profiles!
            </Box>
          </Box>
          )}{" "}
        </>
      ) : (
        <CenterLoading />
      )}

<Filter
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                setProfiles={setProfiles}
              />
    </>
  );
}
