"use client";
import * as React from "react";
import { Box, Typography, Button } from "@mui/material";

const Container = () => {
  const handleUnlock = () => {
    console.log("Unlock clicked");
  };

  const handleLater = () => {
    console.log("Later clicked");
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "80px",
        padding: "120px 40px 40px 40px",
        minHeight: "544px",
        background: "linear-gradient(32deg, #feedfb 40.6%, #fee5ec 58.42%, #f5e5ff 79.81%, #bfeaff 100%)",
        borderRadius: "40px",
        "@media (max-width: 991px)": {
          padding: "80px 30px 30px 30px",
          gap: "60px",
        },
        "@media (max-width: 640px)": {
          padding: "72px 20px 20px 20px",
          gap: "40px",
          borderRadius: "20px",
          minHeight: "262px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#2a1727",
            textAlign: "center",
            fontFamily: '"Inter", sans-serif',
            fontSize: "40px",
            fontWeight: 700,
            "@media (max-width: 991px)": {
              fontSize: "36px",
            },
            "@media (max-width: 640px)": {
              fontSize: "32px",
            },
          }}
        >
          您尚未解锁互动
        </Typography>
        <Typography
          sx={{
            color: "#5c595b",
            textAlign: "center",
            fontFamily: '"Inter", sans-serif',
            fontSize: "30px",
            fontWeight: 400,
            lineHeight: "40px",
            width: "100%",
            "@media (max-width: 991px)": {
              fontSize: "26px",
              lineHeight: "36px",
            },
            "@media (max-width: 640px)": {
              fontSize: "22px",
              lineHeight: "32px",
            },
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
        }}
      >
        <Button
          onClick={handleUnlock}
          aria-label="解锁互动"
          sx={{
            height: "100px",
            padding: "0 40px",
            width: "100%",
            borderRadius: "50px",
            color: "#fff",
            textAlign: "center",
            fontFamily: '"Inter", sans-serif',
            fontSize: "32px",
            fontWeight: 400,
            cursor: "pointer",
            backgroundColor: "#fe6ba2",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#fe6ba2",
            },
            "@media (max-width: 991px)": {
              height: "80px",
              fontSize: "28px",
            },
            "@media (max-width: 640px)": {
              height: "60px",
              fontSize: "24px",
              padding: "0 20px",
            },
          }}
        >
          去解锁
        </Button>
        <Button
          onClick={handleLater}
          aria-label="稍后解锁"
          sx={{
            height: "100px",
            padding: "0 40px",
            width: "100%",
            borderRadius: "50px",
            color: "#5c595b",
            textAlign: "center",
            fontFamily: '"Inter", sans-serif',
            fontSize: "32px",
            fontWeight: 400,
            cursor: "pointer",
            backgroundColor: "transparent",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "@media (max-width: 991px)": {
              height: "80px",
              fontSize: "28px",
            },
            "@media (max-width: 640px)": {
              height: "60px",
              fontSize: "24px",
              padding: "0 20px",
            },
          }}
        >
          稍后解锁
        </Button>
      </Box>
    </Box>
  );
};

export default Container;
