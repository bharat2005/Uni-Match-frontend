import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Card,
  Skeleton,
  CardContent,
  CardMedia,
  Grid,
  Modal,
} from "@mui/material";
import {db} from './firebase';
import {collection, doc, query, setDoc, serverTimestamp} from 'firebase/firestore';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import RejectModal from "./RejectModal";
import AcceptModal from "./AcceptModal";
import { Player } from "@lottiefiles/react-lottie-player";
import Drawer2 from "./Drawer2";
import axios from "axios";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SmallLoading from "../login/SmallLoading";

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
  background: "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
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
  const { setLikesNoti, selfprofile } = useAuth();
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [target_reg_no, setTargetRegNo] = useState(null);
  const [profile, setSelectedProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const [smallLoading, setSmallLoading] = useState(false)
  const [loaded, setLoaded] = useState({})

  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setLoading(true);
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
                .get("https://api.uni-match.in/likes", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  setLikesList(response.data.likesYou);
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
        setLoading(false);
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
    setSmallLoading(true);
    handleNotiClick(target_reg_no);
  
    axios
      .post(
        "https://api.uni-match.in/match",
        { target_reg_no, swipe_action: "right" },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        }
      )
      .then((response) => {
        console.log(response.data.message);
  
        setLikesList((prev) => [...response.data.likesYou]);

        const array = [Number(selfprofile.reg_no), Number(target_reg_no)].sort((a, b) => a - b);
        const match_id = `${array[0]}_${array[1]}`
  
        // ✅ Return setDoc properly so it stays in the chain
        return setDoc(doc(db, "chats", match_id), {
          user_1_reg_no: array[0],
          user_2_reg_no: array[1],
          timestamp: serverTimestamp(),
        });
      })
      .then(() => {
        console.log("Match created successfully!");
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
            .then((response) => {
              const csrfTokenAccess = response.headers["x-csrf-token-access"];
              localStorage.setItem("csrfTokenAccess", csrfTokenAccess);
  
              return axios.post(
                "https://api.uni-match.in/match",
                { target_reg_no, swipe_action: "right" },
                {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                }
              );
            })
            .then((response) => {
              console.log(response.data.message);
              setLikesList((prev) => [...response.data.likesYou]);
            })
            .catch((retryError) =>
              console.error("Failed after refresh:", retryError)
            );
        }
      })
      .finally(() => {
        setSmallLoading(false);
        setAccept(false);
      });
  }
  
  function handleCrossClick(target_reg_no) {
    setSmallLoading(true);
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
          return [...responce.data.likesYou];
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
                    return [...response.data.likesYou];
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
        setSmallLoading(false);
        setReject(false);
      });
  }

  return (
    <>

{smallLoading && <SmallLoading/>}
      <RejectModal
        setModalOpen={setReject}
        modalOpen={reject}
        handleCrossClick={handleCrossClick}
        target_reg_no={String(target_reg_no)}
      />

      <AcceptModal
        setModalOpen={setAccept}
        modalOpen={accept}
        handleLikeClick={handleLikeClick}
        target_reg_no={String(target_reg_no)}
      />


      <Outlet context={{ profile }} />

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
          {!loading ? (
            <>
              {likesList.length ? (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2 }}
                  columns={{ xs: 2, sm: 2 }}
                >
                  {likesList.map((profile, index) => (
                    <Grid item xs={1} key={index}>
                      <Card
                        onClick={() => {
                          setSelectedProfile(profile);
                          navigate("/app/matches/info");
                        }}
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
 {!loaded[index] && (
         <Skeleton
           variant="rectangular"
           sx={{
             width: "100%",
             height: "200px",
             borderRadius: "26px",
             objectFit: "cover",
           }}// Same as CardMedia height
           animation="wave" // Try "pulse" or disable with false
         />
       )}
                         <CardMedia
                           component="img"
                           image={profile.images[0]}
                           onLoad={() => setLoaded(prev=>({...prev, [index]:true}))}
                           sx={{
                             width: "100%",
                             height: "200px",
                             borderRadius: "26px",
                             display: loaded[index] ? "block" : "none",
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
                              setTargetRegNo(profile.reg_no);
                              setTimeout(setReject("reject"), 500);
                            }}
                            sx={{
                              width: "48px",
                              height: "48px",
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
                                fontSize: "28px",
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
                              setTargetRegNo(profile.reg_no);
                              setTimeout(setAccept("accept"), 500);
                            }}
                            sx={{
                              width: "48px",
                              height: "48px",
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
                                fontSize: "28px",
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
                          <Typography sx={detailsStyle}>
                            {profile.reason}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
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
                  <img src={"/empty-box.png"} style={{ width: "120px" }} />
                  <Box
                    sx={{
                      fontSize: "18px",
                      color: "#888", // Typical gray placeholder color
                    }}
                  >
                    No matches yet!
                  </Box>
                </Box>
              )}{" "}
            </>
          ) : (
            <Grid
              container
              spacing={{ xs: 1, sm: 2 }}
              columns={{ xs: 2, sm: 2 }}
            >
              {[...Array(6)].map((_, index) => (
                <Grid item xs={1} key={index}>
                  <Card
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
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={200}
                      sx={{ borderRadius: "26px" }}
                    />
                    <CardContent
                      sx={{
                        paddingBottom: "12px !important",
                        paddingTop: "6px !important",
                      }}
                    >
                      <Skeleton width="60%" height={30} />
                      <Skeleton width="40%" height={20} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
