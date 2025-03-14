"use client";
import * as React from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { Box, Typography, Button, Modal } from "@mui/material";

const Container = ({ setModalOpen, modalOpen }) => {
  const handleUnlock = () => {
    console.log("Unlock clicked");
    setModalOpen(false); // Close modal after unlock
  };

  const handleLater = () => {
    console.log("Later clicked");
    setModalOpen(false); // Close modal after later
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >


  
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          width:'75vw',
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


<Box sx={{position:'relative', bottom:'28%'}}>
      <Player
    autoplay
    loop
    src={'/accept.json'}
   style={{ height: '130px'}}
  />

      </Box>


        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position:'relative',
            bottom:'40%',
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
          >
            您尚未解锁互动
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
          >
            完成任务，解锁互动
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position:'relative',
            bottom:'40%',
          }}
        >
          <Button
            onClick={handleUnlock}
            aria-label="解锁互动"
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
            去解锁
          </Button>
          <Button
            onClick={handleLater}
            aria-label="稍后解锁"
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
          >
            稍后解锁
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Container;
