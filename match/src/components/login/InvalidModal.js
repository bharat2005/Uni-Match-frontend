"use client";
import * as React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, Typography, Button, Modal, Fade } from "@mui/material";
import animationData from "./invalid.json"; 

const Container = ({ invalid, setInvalid }) => {
  const playerRef = React.useRef(null); 
  return (
    <Modal
      open={invalid}
      //onClose={() => setInvalid(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      closeAfterTransition
      BackdropProps={{
        timeout: 500, // Smooth backdrop fade
      }}
    >
      <Fade in={invalid} timeout={500}>
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
          <Box sx={{ position: "relative", bottom: "28%" }}>
          <Player
              ref={playerRef} // ✅ Use ref to avoid re-rendering delays
              autoplay
              loop
              src={animationData} // ✅ Use preloaded JSON
              style={{ height: "230px" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              bottom:"60%",
              alignItems: "center",
              gap: "16px",
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
              }}
            >
    Login Failed

            </Typography>
            <Typography
              id="modal-description"
              sx={{
                color: "#5c595b",
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "20px",
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
            >
           Oops! The registration number or password you entered is incorrect. Please double-check and try again

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
              bottom: "60%",
            }}
          >
            <Button
              onClick={()=>setInvalid(false)}
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
            >
              Okay!
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Container;
