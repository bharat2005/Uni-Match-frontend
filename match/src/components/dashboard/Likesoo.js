import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Modal,
} from "@mui/material";
import UnlikeModal from "./UnlikeModal";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Player } from "@lottiefiles/react-lottie-player";
import Drawer2 from "./Drawer2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
import SmallLoading from "../login/SmallLoading";

const profile = {
  reg_no: "12413928",
  reason: "Long-term relationship",
  age: 23,
  name: "Bharat",
  personality: "extrovert",
  images: [null, "/10.jpg", "/4.jpg", "/5.jpg", null],
  bio: "Im the solo developer of this whole Uni-Match platform...😎",
  interests: [
    "Gardening",
    "Paragliding",
    "Puzzles",
    "Astronomy",
    "Juggling",
    "Art",
  ],
};

const ProfileGrid = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likedList, setLikedList] = useState([]);
  const [profile, setSelectedProfile] = useState({});
  const [target_reg_no, setTargetRegNo] = useState(null);
  const [smallLoading, setSmallLoading] = useState(false)
  const [loaded, setLoaded] = useState({})

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.uni-match.in/likedbyu", {
        withCredentials: true,
        headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
      })
      .then((response) => {
        console.log(response.data);
        setLikedList(response.data.likedByYou);
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
                .get("https://api.uni-match.in/likedbyu", {
                  withCredentials: true,
                  headers: {
                    "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
                  },
                })
                .then((response) => {
                  console.log(response.data);
                  setLikedList(response.data.likedByYou);
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

  useEffect(() => {
    // Disable scrolling for the whole page
    document.body.style.overflow = "hidden";

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleCrossClick(target_reg_no) {
    setSmallLoading(true);
    axios
      .post(
        "https://api.uni-match.in/likedbyudel",
        { target_reg_no, swipe_action: "left" },
        {
          withCredentials: true,
          headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
        },
      )
      .then((responce) => {
        console.log(responce.data.message);
        setLikedList((prev) => {
          return [...responce.data.likedByYou];
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
                  "https://api.uni-match.in/likedbyudel",
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
                  setLikedList((prev) => {
                    return [...response.data.likedByYou];
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
        setModalOpen(false);
      });
  }

  return (
    <>
    {smallLoading && <SmallLoading/>}

      <UnlikeModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        handleCrossClick1={handleCrossClick}
        target_reg_no={String(target_reg_no)}
      />

      <Outlet context={{ profile }} />

      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          minHeight: "100vh",
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
              letterSpacing: "0.5px"
            }}
          >
            Likes
          </Typography>
        </Box>

        <Box
          sx={{
            height: `calc(100vh - 42px - 46px - 16px)`,
            overflowY: "auto",
            padding: "8px",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {!loading ? (
            <>
              {likedList.length ? (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2 }}
                  columns={{ xs: 2, sm: 2 }}
                >
                  {likedList.map((profile, index) => (
                    <Grid
                      item
                      xs={1}
                      key={index}
                      onClick={() => {
                        setSelectedProfile(profile);
                        navigate("/app/likes/info");
                      }}
                    >
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

{!loaded[index] && (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "200px",
            borderRadius: "26px",
            objectFit: "cover",
          }}// Same as CardMedia height
          animation="pulse" // Try "pulse" or disable with false
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

                        <Box
                          sx={{
                            position: "absolute",
                            top: "60%", // Center vertically
                            left: "80%", // Center horizontally
                            transform: "translate(-50%, -20%)", // Adjust positioning slightly upwards
                            display: "flex",
                            gap: 2,
                          }}
                        >
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setTargetRegNo(profile.reg_no);
                              setModalOpen(true);
                            }}
                            sx={{
                              width: "48px",
                              height: "48px",
                              color: "white",
                              backgroundColor: "rgba(0, 0, 0, 0.8)",
                              padding: "12px",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 1)",
                              },
                              "&:active": {
                                transform: "scale(0.8)", // Less shrink to feel more natural
                                boxShadow: "0 4px 12px rgba(255, 0, 110, 0.9)", // More intense active shadow
                              },
                            }}
                          >
                            <i
                              className="ti ti-x"
                              style={{ fontSize: "32px" }}
                            ></i>
                          </IconButton>
                        </Box>

                        <CardContent
                          sx={{
                            paddingBottom: "12px !important",
                            paddingTop: "6px !important",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: '"Inter", sans-serif',
                              fontSize: {
                                xs: "20px",
                                sm: "26px",
                              },
                              fontWeight: 600,
                              color: "#333",
                              marginBottom: "0px",
                            }}
                          >
                            {profile.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: '"Inter", sans-serif',
                              fontSize: {
                                xs: "12px",
                                sm: "14px",
                              },
                              color: "#666",
                              lineHeight: 1.4,
                            }}
                          >
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
                    No likes yet!
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <>
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
            </>
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
