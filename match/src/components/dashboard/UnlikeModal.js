"use client";
import * as React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, Typography, Button, Modal, Fade, Grow } from "@mui/material";
import animationData from "./unlike.json"; 

const Container = ({
  setModalOpen,
  modalOpen,
  target_reg_no,
  handleCrossClick1,
}) => {
    const playerRef = React.useRef(null); 

  const handleLater = () => {
    console.log("Later clicked");
    setModalOpen(false); // Close modal after later
  };

  return (
    <Modal
      open={modalOpen}
      //onClose={() => setModalOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      BackdropProps={{
        timeout: 500, // Smooth backdrop fade
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in={modalOpen} timeout={500}>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75vw",
            justifyContent: "center",
            alignItems: "center",
            gap: "70px",
            padding: "120px 40px 40px 40px",
            height: "24%",
            background:
              "linear-gradient(32deg, #feedfb 40.6%, #fee5ec 58.42%, #f5e5ff 79.81%, #bfeaff 100%)",
            borderRadius: "40px",
            outline: "none", // Removes default focus outline
            "@media (max-width: 991px)": {
              padding: "80px 30px 30px 30px",
              gap: "50px",
            },
            "@media (max-width: 640px)": {
              padding: "72px 20px 20px 20px",
              gap: "30px",
              borderRadius: "20px",
              //minHeight: "262px",
            },
          }}
        >
          <Box sx={{ position: "relative", bottom: "50%" }}>
            <Player
               ref={playerRef} // ✅ Use ref to avoid re-rendering delays
               autoplay
               loop
               src={animationData} 
              style={{ height: "260px" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              bottom: "70%",
              alignItems: "center",
              gap: "8px",
              width: "100%",
            }}
          >
            <Typography
              variant="h1"
              id="modal-title"
              sx={{
                color: "#2a1727",
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontSize: "20px",
                fontWeight: 700,
                // "@media (max-width: 991px)": {
                //   fontSize: "36px",
                // },
                // "@media (max-width: 640px)": {
                //   fontSize: "32px",
                // },
              }}
            >Are you sure about this?
            </Typography>
            <Typography
              id="modal-description"
              sx={{
                color: "#5c595b",
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "40px",
                width: "100%",
                // "@media (max-width: 991px)": {
                //   fontSize: "26px",
                //   lineHeight: "36px",
                // },
                // "@media (max-width: 640px)": {
                //   fontSize: "22px",
                //   lineHeight: "32px",
                // },
              }}
            > to undo the like?
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative",
              bottom: "70%",
            }}
          >
            <Button
              onClick={() => handleCrossClick1(target_reg_no)}
              sx={{
                height: "50px",
                padding: "0 40px",
                width: "95%",
                borderRadius: "50px",
                color: "#fff",
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                fontWeight: 400,
                backgroundColor: "#fe6ba2",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fe6ba2",
                },
                // "@media (max-width: 991px)": {
                //   height: "80px",
                //   fontSize: "28px",
                // },
                // "@media (max-width: 640px)": {
                //   height: "60px",
                //   fontSize: "24px",
                //   padding: "0 20px",
                // },
              }}
            >Undo
            </Button>
            <Button
              onClick={handleLater}
              sx={{
                height: "50px",
                padding: "0 40px",
                width: "95%",
                borderRadius: "50px",
                color: "#5c595b",
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                backgroundColor: "transparent",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                // "@media (max-width: 991px)": {
                //   height: "80px",
                //   fontSize: "28px",
                // },
                // "@media (max-width: 640px)": {
                //   height: "60px",
                //   fontSize: "24px",
                //   padding: "0 20px",
                // },
              }}
            >Keep it
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Container;
