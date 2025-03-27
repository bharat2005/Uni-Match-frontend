"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import axios from "axios";
import {
  Avatar,
  Badge,
  List,
  ListItem,
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

const profile = {
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

const chatData = [
  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },

  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },
];
export default function ChatInterface() {
  const navigate = useNavigate();
  const { setMatchesNoti } = useAuth();
  const [imageClick, setImageClick] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const list = profile.images.filter((item) => item != null);

  //  useEffect(() => {
  //     axios
  //       .get("https://api.uni-match.in/matches", {
  //         withCredentials: true,
  //         headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setMatchList(response.data.matches);
  //         setNotifications(response.data.notifications);
  //       })
  //       .catch((error) => {
  //         console.error("Error: ", error);

  //         if (error.response?.status === 401) {
  //           axios
  //             .post(
  //               "https://api.uni-match.in/refresh",
  //               {},
  //               {
  //                 withCredentials: true,
  //                 headers: {
  //                   "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
  //                 },
  //               },
  //             )

  //             .then((refreshResponse) => {
  //               const csrfToken = refreshResponse.headers["x-csrf-token"];
  //               localStorage.setItem("csrfToken", csrfToken);

  //               axios
  //                 .get("https://api.uni-match.in/matches", {
  //                   withCredentials: true,
  //                   headers: {
  //                     "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
  //                   },
  //                 })
  //                 .then((response) => {
  //                   console.log("Protected Data (After Refresh):", response.data);
  //                   setMatchList(response.data.matches);
  //                   setNotifications(response.data.notifications);
  //                 })
  //                 .catch((retryError) =>
  //                   console.error("Failed after refresh:", retryError),
  //                 );
  //             })
  //             .catch(() =>
  //               console.error("Session expired, please log in again."),
  //             );
  //         }
  //       });
  //   }, [selectedMatch]);

  // const handleTabChange = (event, newValue) => {
  //   setValue(newValue);
  // };

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

  // function handleDeleteMatch(e, data) {
  //   e.stopPropagation();
  //   axios
  //     .post("https://api.uni-match.in/matchdel", data, {
  //       withCredentials: true,
  //       headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfToken") },
  //     })
  //     .then((response) => {
  //       setMatchList(response.data.matches);
  //       setMatchesNoti(response.data.MatchesNoti);
  //     })
  //     .catch((error) => {
  //       console.error("Error :", error);
  //     });
  // }

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

  // let filteredList;
  // if (matchList) {
  //   filteredList = matchList;
  // }

  // if (selectedMatch) {
  //   return (
  //     <Chat
  //       match={selectedMatch}
  //       profile={profile}
  //       onBack={() => setSelectedMatch(null)}
  //     />
  //   );
  // }

  return (
    <>
      <Outlet />

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
            {chatData.map((chat, index) => (
              <ListItem
                onClick={() => {
                  handleNotiClick("12413326");
                  navigate(`/app/${chat.id}`);
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
                      navigate("/app/chats/info");
                    }}
                    src={chat.image}
                    alt={`${chat.name}'s profile`}
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
                      {chat.name}
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
                      {chat.message}
                    </Typography>
                  }
                />
                {chat.count > 0 && (
                  <Badge
                    badgeContent={chat.count}
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
                  {chat.time}
                </Typography>
              </ListItem>
            ))}
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
