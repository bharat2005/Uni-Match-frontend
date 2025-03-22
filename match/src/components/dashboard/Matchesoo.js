import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Modall from "./Modal";
import Drawer2 from "./Drawer2";
import axios from 'axios';
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
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


const profiles = [
  {
    name: "Bharat, 19",
    details: "🎉Casual Dating",
    imageUrl: "/5.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Amit, 18",
    details: "💘Long-term",
    imageUrl: "/6.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Rahul, 20",
    details: "😍Short-term",
    imageUrl: "/7.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Deepak, 23",
    details: "🎉Casual Dating",
    imageUrl: "/8.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Rakesh, 23",
    details: "💘Long-term",
    imageUrl: "/9.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Nikhil, 19",
    details: "😍Short-term",
    imageUrl: "/10.jpg",
    imageAlt: "Profile photo",
  },
  {
    name: "Tanmay, 22",
    details: "😍Short-term",
    imageUrl: "/11.jpg",
    imageAlt: "Profile photo",
  },
];

const containerStyle = {
  background:
    "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
  minHeight: "100vh",
  padding: {
    xs: "12px",
    sm: "14px",
    md: "18px",
  },
};

const scrollableGridStyle = {
  height: `calc(100vh - 42px - 46px - 16px)`, // Adjust height as needed
  overflowY: "auto",
  padding: "8px",
  //border: "1px solid #ddd", // Optional for visual clarity
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome, Safari, and Opera
  },
};


const nameStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: {
    xs: "20px",
    sm: "26px",
  },
  fontWeight: 600,
  color: "#333",
  marginBottom: "0px",
};

const detailsStyle = {
  fontFamily: '"Inter", sans-serif',
  fontSize: {
    xs: "12px",
    sm: "14px",
  },
  color: "#666",
  lineHeight: 1.4,
};

const ProfileGrid = () => {
  const navigate = useNavigate();
  const {setLikesNoti} = useAuth();
  //const [open, setOpen] = useState(false);
  const [name, setName] = useState(false);
  const [target_reg_no, setTargetRegNo] = useState(null);
  const [likesList, setLikesList] = useState([])
 // const [imageClick, setImageClick] = useState(false);
 // const [currentImageIndex, setCurrentImageIndex] = useState(0);
//  const [imageLoaded, setImageLoaded] = useState(false);
  const list = profile.images.filter((item) => item != null);

  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://api.uni-match.in/likes", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setLikesList(response.data.likesYou);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);


  function handleNotiClick(target_reg_no) {
    axios
      .patch(
        "https://api.uni-match.in/notidel",
        { target_reg_no },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        },
      )
      .then((response) => {
        console.log(response.data);
        setLikesNoti(response.data.likesNoti);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  function handleLikeClick(target_reg_no) {
    //setLoad(true);
    handleNotiClick(target_reg_no);
    axios
      .post(
        "https://api.uni-match.in/match",
        { target_reg_no, swipe_action: "right" },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        },
      )
      .then((responce) => {
        console.log(responce.data.message);
        setLikesList((prev) => {
          return [ ...responce.data.likesYou ];
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
              },
            )

            .then((response) => {
              const csrfTokenAccess = response.headers["x-csrf-token-access"];
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

              axios
              .post(
                "https://api.uni-match.in/match",
                { target_reg_no, swipe_action: "right" },
                {
                  withCredentials: true,
                  headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
                },
              )
              .then((responce) => {
                console.log(responce.data.message);
                setLikesList((prev) => {
                  return [...responce.data.likesYou ];
                });
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
        //setLoad(false);
        setName(false)
      });
  }

  function handleCrossClick(target_reg_no) {
    //setLoad(true);
    handleNotiClick(target_reg_no);
    axios
      .post(
        "https://api.uni-match.in/likeno",
        { target_reg_no, swipe_action: "left" },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        },
      )
      .then((responce) => {
        console.log(responce.data.message);
        setLikesList((prev) => {
          return [...responce.data.likesYou ];
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
              },
            )

            .then((response) => {
              const csrfTokenAccess = response.headers["x-csrf-token-access"];
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

              axios
                .post(
                  "https://api.uni-match.in/likeno",
                  { target_reg_no, swipe_action: "left" },
                  {
                    withCredentials: true,
                    headers: {
                      "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                    },
                  },
                )
                .then((response) => {
                  console.log("Protected Data (After Refresh):", response.data);
                  setLikesList((prev) => {
                    return [ ...response.data.likesYou ];
                  });
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
        //setLoad(false);
        setName(false)
      });
  }


  return (
    <>
      <Modall setModalOpen={setName} modalOpen={name} name={name} handleCrossClick={handleCrossClick} handleLikeClick={handleLikeClick} target_reg_no={String(target_reg_no)}/>

      <Outlet/>

      <Box sx={containerStyle}>
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "24px", sm: "28px" }, // Responsive font size
              fontWeight: 600, // Bold for clear hierarchy
              color: "#333", // Subtle but clear color
              letterSpacing: "0.5px", // Improve readability
              // paddingBottom: "8px", // Space between subheading and content
              // borderBottom: "2px solid #eee", // Light separator for clarity
            }}
          >
            Matches
          </Typography>
        </Box>
        {/* Scrollable Grid */}
        <Box sx={scrollableGridStyle}>
          {likesList.length ? (
          <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 2 }}>
            {likesList.map((profile, index) => (
              <Grid item xs={1} key={index}>
                <Card
                  onClick={() => navigate('/app/mathes/info')}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: "none",
                    background: "transparent",
                    height: "100%",
                    position: "relative",
                    textAlign: "left",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={profile.images[0]}
                    sx={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "26px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Heart and Cross Buttons */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "60%", // Center vertically
                      left: "50%", // Center horizontally
                      transform: "translate(-50%, -20%)", // Adjust positioning slightly upwards
                      display: "flex",
                      gap: 6,
                    }}
                  >
                    <IconButton
                      aria-label="unlike"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetRegNo(profile.reg_no)
                        setTimeout(setName("reject"),500);
                      }}
                      sx={{
                        width: "44px",
                        height: "44px",
                        color: "transparent", // Make the text transparent to allow gradient to show
                        backgroundColor: "rgba(0, 0, 0, 0.8)", // Inverted background color
                        padding: "12px",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "#rgba(0, 0, 0, 1)", // Subtle hover effect
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        boxShadow: "0 8px 24px rgba(255, 0, 110, 0.8)", // Stronger focus effect

                        "&:active": {
                          transform: "scale(0.8)", // Less shrink to feel more natural
                          boxShadow: "0 4px 12px rgba(255, 0, 110, 0.9)", // More intense active shadow
                        },
                      }}
                    >
                      <i
                        className="ti ti-x"
                        style={{
                          fontSize: "26px",
                          background:
                            "linear-gradient(145deg, #FF006E 0%, #FB5607 50%, #FFBE0B 100%)",
                          WebkitBackgroundClip: "text", // Clip gradient to text
                          WebkitTextFillColor: "transparent", // Make text transparent
                          transition: "background 0.3s ease",
                        }}
                      />
                    </IconButton>

                    <IconButton
                      aria-label="like"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetRegNo(profile.reg_no)
                        setTimeout(setName("accept"),500);
                      }}
                      sx={{
                        width: "44px",
                        height: "44px",
                        color: "transparent",
                        background: "rgba(0, 0, 0, 0.8)",
                        padding: "12px",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "#rgba(0, 0, 0, 1)",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        boxShadow: "0 8px 24px rgba(0, 200, 83, 0.8)", // Strong green glow on focus

                        "&:active": {
                          transform: "scale(0.8)", // Consistent shrink effect
                          boxShadow: "0 4px 12px rgba(0, 200, 83, 0.9)", // Punchy feedback
                        },
                      }}
                    >
                      <i
                        className="ti ti-heart-filled"
                        style={{
                          fontSize: "26px",
                          background:
                            "linear-gradient(145deg, #00C853 0%, #B2FF59 50%, #FFD600 100%)",
                          WebkitBackgroundClip: "text", // Clip gradient to text
                          WebkitTextFillColor: "transparent", // Make text transparent
                          transition: "background 0.3s ease",
                        }}
                      />
                    </IconButton>
                  </Box>

                  <CardContent
                    sx={{
                      paddingBottom: "12px !important",
                      paddingTop: "6px !important",
                    }}
                  >
                    <Typography sx={nameStyle}>{profile.name}</Typography>
                    <Typography sx={detailsStyle}>{profile.reason}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>):(
              <div>No matches yet!</div>
          )}
          <Box
            sx={{
              height: "40px", // Same as or slightly more than the navbar height
              backgroundColor: "transparent", // Invisible, just for spacing
            }}
          />
        </Box>
      </Box>

    
    </>
  );
};

export default ProfileGrid;
