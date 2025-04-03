"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import { db } from './firebase';
import { collection, deleteDoc,doc, serverTimestamp, getDocs, orderBy, where, query, onSnapshot, limit, writeBatch } from "firebase/firestore";
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
import DeleteModal from './DeleteModal';
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
  const [target_reg_no, setTargetRegNo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [unseenCounts, setUnseenCounts] = useState({});
  const [lastMessages, setLastMessages] = useState({})


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
 
  
        // 🛠 Setup Firestore listeners for unseen messages + last message
        unsubscribers = response.data.matches.map((chat) => {
          const match_id = chat.match_instance.match_id;
  
          // 🟢 Unseen Messages Listener
          const unseenListener = onSnapshot(
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
  
          // 🟠 Last Message Listener
          const lastMessageListener = onSnapshot(
            query(
              collection(db, "chats", match_id, "messages"),
              orderBy("timestamp", "desc"), // Latest message first
              limit(1) // Fetch only the latest message
            ),
            (snapshot) => {
              if (!snapshot.empty) {
                const lastMessage = snapshot.docs[0].data();
                setLastMessages((prev) => ({
                  ...prev,
                  [match_id]: {
                    text: lastMessage.text,
                    time: lastMessage.timestamp,
                  },
                }));
              }
            }
          );
  
          return () => {
            unseenListener();
            lastMessageListener();
          };
        });

        setMatchList(response.data.matches);
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
                
  
                  // 🔴 Remove old listeners before adding new ones
                  unsubscribers.forEach((unsub) => unsub());
                  unsubscribers = response.data.matches.map((chat) => {
                    const match_id = chat.match_instance.match_id;
  
                    // 🟢 Unseen Messages Listener
                    const unseenListener = onSnapshot(
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
  
                    // 🟠 Last Message Listener
                    const lastMessageListener = onSnapshot(
                      query(
                        collection(db, "chats", match_id, "messages"),
                        orderBy("timestamp", "desc"), 
                        limit(1)
                      ),
                      (snapshot) => {
                        if (!snapshot.empty) {
                          const lastMessage = snapshot.docs[0].data();
                          setLastMessages((prev) => ({
                            ...prev,
                            [match_id]: {
                              text: lastMessage.text,
                              time: lastMessage.timestamp,
                            },
                          }));
                        }
                      }
                    );
  
                    return () => {
                      unseenListener();
                      lastMessageListener();
                    };
                  });

                  setMatchList(response.data.matches);
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
  
    // Cleanup function to remove Firestore listeners
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

  function handleDeleteMatch(target_reg_no) {
  
    axios
      .post("https://api.uni-match.in/matchdel", {user_2_reg_no:target_reg_no}, {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        setMatchList(response.data.matches);
        setMatchesNoti(response.data.MatchesNoti);

        const array = [Number(selfprofile.reg_no), Number(target_reg_no)].sort((a, b) => a - b);
        const match_id = `${array[0]}_${array[1]}`

       return deleteDoc(doc(db, "chats", match_id))
      })
      .then(() => {
        console.log("Chat deleted successfully!");
      })  
      .catch((error) => {
        console.error("Error :", error);
      });
  }
  const startPress = () => {
    setIsPressed(true);

    pressTimer.current = setTimeout(() => {
      if ("vibrate" in navigator) {
        navigator.vibrate(200); // Haptic feedback (200ms)
      }
      setModalOpen(true); // Open modal
    }, 600); // Trigger after 600ms hold
  };

  // Handle long press end (prevent accidental trigger)
  const endPress = () => {
    clearTimeout(pressTimer.current);
    setIsPressed(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return null; // If no timestamp, return nothing
  
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
  
    // Check if it's today
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // e.g., "10:30 AM"
    }
  
    // Check if it's yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
  
    // Otherwise, return date in "DD/MM/YY" format
    return date.toLocaleDateString();
  };
  


  return (
    <>
          <DeleteModal
        setModalOpen={setModalOpen}
        modalOpen={true}
        handleDeleteMatch={handleDeleteMatch}
        target_reg_no={String(target_reg_no)}
      />
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
              onTouchStart={()=> {setTargetRegNo(chat.match_user_data.reg_no); startPress()}} // Mobile support
              onTouchEnd={endPress}
                onClick={() => {
                  handleNotiClick(chat.match_user_data.reg_no);
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
                    imgProps={{
                      onLoad: (e) => (e.target.style.opacity = 1), // Smooth fade-in
                      onError: (e) => (e.target.src = "/4.jpg"), // Fallback image
                      style: { opacity: 0, transition: "opacity 0.3s ease-in-out" },
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
                   {lastMessages[chat.match_instance.match_id]?.text || null}
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
      {formatTime(lastMessages[chat.match_instance.match_id]?.time)}
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
