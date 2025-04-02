"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs, orderBy, where, query, onSnapshot, writeBatch } from "firebase/firestore";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  Skeleton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import Chatoo from "./Chatoo";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer2 from "./Drawer2";
import SmallLoading from "../login/SmallLoading";
import { Outlet } from "react-router-dom";

const profileX = {
  reg_no: "12413928",
  reason: "Long-term relationship",
  age: 20,
  name: "Jisoo",
  personality: "extrovert",
  images: ["/2.jpg", "/3.jpg", "/1.jpg", null, null],
  bio: "Im the solo developer of this whole Uni-Match platform...😎",
  interests: [
    "Gardening",
    "Paragliding",
    "Puzzles",
    "Juggling",
    "Art",
    "Juggling",
  ],
};

export default function ChatInterface() {
  const navigate = useNavigate();
  const {setChatProfile, selfprofile} = useAuth();
  const [isPressed, setIsPressed] = useState(false);
  const [matchIdList, setMatchIdList] = useState([])
  const { setMatchesNoti } = useAuth();
  const [matchList, setMatchList] = useState([profileX])
  const [profile, setSelectedProfile] = useState({});
  const [loading, setLoading] = useState(true)
  const pressTimer = useRef(null);
  const [unseenCounts, setUnseenCounts] = useState({})


  useEffect(() => {
    setLoading(true);
    let unsubscribers = [];
  
    axios
      .get("https://api.uni-match.in/matches", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setMatchList(response.data.matches);
  
        // Setup Firestore listeners for unseen messages
        unsubscribers = response.data.matches.map((chat) => {
          const match_id = chat.match_instance.match_id;
          return onSnapshot(
            query(
              collection(db, "chats", match_id, "messages"),
              where("status", "==", "unseen"),
              where("sender_reg_no", "!=", selfprofile.reg_no)
            ),
            (snapshot) => {
              setUnseenCounts((prev) => ({
                ...prev,
                [match_id]: snapshot.docs.length,
              }));
            }
          );
        });
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
              }
            )
            .then((refreshResponse) => {
              const csrfToken = refreshResponse.headers["x-csrf-token"];
              localStorage.setItem("csrfToken", csrfToken);
  
              axios
                .get("https://api.uni-match.in/matches", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data);
                  setMatchList(response.data.matches);
                  // 🔴 PROBLEM: Not setting up Firestore listeners again! (Fix below)
                  unsubscribers.forEach((unsub) => unsub()); // Remove old listeners
                  unsubscribers = response.data.matches.map((chat) => {
                    const match_id = chat.match_instance.match_id;
                    return onSnapshot(
                      query(
                        collection(db, "chats", match_id, "messages"),
                        where("status", "==", "unseen"),
                        where("receiver_reg_no", "==", selfprofile.reg_no)
                      ),
                      (snapshot) => {
                        setUnseenCounts((prev) => ({
                          ...prev,
                          [match_id]: snapshot.docs.length,
                        }));
                      }
                    );
                  });
                })
                .catch((retryError) =>
                  console.error("Failed after refresh:", retryError)
                );
            })
            .catch(() => console.error("Session expired, please log in again."));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  
    // Cleanup function (outside axios call)
    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);
  

  function handleNotiClick(sender_reg_no) {
    axios
      .patch(
        "https://api.uni-match.in/notidel",
        { sender_reg_no },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") },
        },
      )
      .then((response) => {
        console.log(response.data);
        setMatchesNoti(response.data.MatchesNoti);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  function handleDeleteMatch(e, data) {
    e.stopPropagation();
    axios
      .post("https://api.uni-match.in/matchdel", data, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") },
      })
      .then((response) => {
        setMatchList(response.data.matches);
        setMatchesNoti(response.data.MatchesNoti);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }

  const startPress = () => {
    setIsPressed(true); // Change color
    pressTimer.current = setTimeout(() => {
      if ("vibrate" in navigator) {
        navigator.vibrate(200); // Vibrate for 200ms
      }
    }, 800); // Trigger after 800ms hold
  };

  // Function to clear long press if released early
  const endPress = () => {
    clearTimeout(pressTimer.current);
    setIsPressed(false);
  };
 

  // function handleClick(sender_reg_no) {
  //   handleNotiClick(sender_reg_no);
  //   axios
  //     .post(
  //       "https://api.uni-match.in/seen",
  //       { sender_reg_no },
  //       {
  //         withCredentials: true,
  //         headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
  //       },
  //     )
  //     .then((responce) => {
  //       console.log(responce.data.message);
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //     });
  // }


  return (
    <>
      <Outlet context={{ profile }} />

      <Container
        component="main"
        sx={{
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          padding: {
            xs: "12px",
            sm: "14px",
            md: "18px",
          },
        }}
      >
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "24px", sm: "28px" },
              fontWeight: 600,
              color: "#333",
              letterSpacing: "0.5px",
            }}
          >
            Chats
          </Typography>
        </Box>

        {/* Fix the height here */}
        <Container
          component="section"
          sx={{
            maxWidth: {
              xs: "100%",
              md: "600px",
            },
            height: "100vh",
            margin: "0 auto",

            borderRadius: "20px",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <List
            sx={{
              height: `calc(100vh - 42px - 46px - 16px)`,
              overflowY: "auto",
              background: "white",
              borderRadius: "20px",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            { !loading ? (
             matchList.length ? (
            matchList.map((chat, index) => (
              <ListItem
              onTouchStart={startPress} // Mobile
              onTouchEnd={endPress}
                onClick={() => {
                  //handleNotiClick("12413326");
                  setChatProfile(chat);
                  //setSelectedProfile(chat)
                  navigate(`/app/${chat.match_user_data.reg_no}`)
                }}
                key={index}
                sx={{
                  padding: {
                    xs: "10px",
                    sm: "13px",
                  },
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedProfile(chat.match_user_data);
                      navigate("/app/chats/info");
                    }}
                    src={chat.match_user_data.images[0]}
                    alt={`${chat.match_user_data.name}'s profile`}
                    sx={{
                      width: {
                        xs: "55px",
                        sm: "65px",
                      },
                      height: {
                        xs: "55px",
                        sm: "65px",
                      },
                      marginRight: "15px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "20px",
                        },
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "0px",
                      }}
                    >
                      {chat.match_user_data.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "16px",
                        },
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      love you so muchhhh
                    </Typography>
                  }
                />
                {unseenCounts[chat.match_instance.match_id] > 0 && (
                  <Badge
                    badgeContent={unseenCounts[chat.match_instance.match_id]}
                    sx={{
                      position: "absolute",
                      right: "6%",
                      marginTop: 2,
                      "& .MuiBadge-badge": {
                        backgroundColor: "#FE6BA2",
                        color: "white",
                        fontSize: {
                          xs: "11px",
                          sm: "12px",
                        },
                        minWidth: {
                          xs: "20px",
                          sm: "24px",
                        },
                        height: {
                          xs: "20px",
                          sm: "24px",
                        },
                        borderRadius: "50%",
                      },
                    }}
                  />
                )}
                <Typography
                  component="time"
                  sx={{
                    color: "#9ca3af",
                    fontSize: {
                      xs: "11px",
                      sm: "12px",
                    },
                    position: "absolute",
                    right: "15px",
                    top: "15px",
                  }}
                >
                  12:00 pm
                </Typography>
              </ListItem>
            ))
            ):(
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
                                <img src={"/empty-box.png"} style={{ width: "110px" }} />
                                <Box
                                  sx={{
                                    fontSize: "18px",
                                    color: "#888", // Typical gray placeholder color
                                  }}
                                >
                                  No chats yet!
                                </Box>
            </Box>
            )
          ):(
            Array.from(new Array(10)).map((_, index) => ( // Generates 5 skeletons
              <ListItem key={index} sx={{ padding: { xs: "10px", sm: "13px" }, display: "flex", alignItems: "center" }}>
                {/* Avatar Skeleton */}
                <ListItemAvatar>
                  <Skeleton variant="circular" width={55} height={55} />
                </ListItemAvatar>
      
                {/* Text Skeletons */}
                <ListItemText
                  primary={<Skeleton variant="text" width="40%" height={24} />}
                  secondary={<Skeleton variant="text" width="60%" height={16} />}
                />
              </ListItem>
            ))
          )}

            
            <Box
              sx={{
                height: "40px", // Same as or slightly more than the navbar height
                backgroundColor: "transparent", // Invisible, just for spacing
              }}
            />
          </List>
        </Container>
      </Container>
    </>
  );
}
