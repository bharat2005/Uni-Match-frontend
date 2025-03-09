"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const chatData = [
  {
    name: "蓉蓉",
    message: "集美们，冲呀！",
    count: 8,
    time: "16:04",
    image: "https://placehold.co/100x100/f5f5f5/f5f5f5",
  },
  {
    name: "章鱼先生",
    message: "你好，可以认识下吗？",
    count: 1,
    time: "16:04",
    image: "https://placehold.co/100x100/ffffff/ffffff",
  },
  {
    name: "吴老师",
    message: "你想找什么样的呢",
    count: 92,
    time: "16:04",
    image: "https://placehold.co/100x100/2c3e50/2c3e50",
  },
  {
    name: "张女士221",
    message: "今天我们一起过去买吧",
    count: 1,
    time: "16:04",
    image: "https://placehold.co/100x100/333333/333333",
  },
  {
    name: "淑琴",
    message: "没想到在这里都能碰见[偷笑][偷笑]",
    count: 3,
    time: "16:04",
    image: "https://placehold.co/100x100/8b4513/8b4513",
  },
  {
    name: "瑶瑶妹",
    message: "你好呀？",
    count: 8,
    time: "16:04",
    image: "https://placehold.co/100x100/f5f5f5/f5f5f5",
  },
  {
    name: "Bharat",
    message: "Babyyyy....!",
    count: 100,
    time: "00:00",
    image: "https://placehold.co/100x100/f5f5f5/f5f5f5",
  },
];

const ChatInterface = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <Box
        component="main"
        sx={{
          background: "linear-gradient(135deg, #fce7f3, #ede9fe)",
          minHeight: "100vh",
          padding: {
            xs: "10px",
            sm: "15px",
            md: "20px",
          },
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <Container
          component="section"
          sx={{
            maxWidth: {
              xs: "100%",
              md: "600px",
            },
            margin: "0 auto",
            background: "white",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            p: 0,
          }}
        >
          {chatData.map((chat, index) => (
            <Box
              key={index}
              component="article"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: {
                  xs: "12px",
                  sm: "15px",
                },
                borderBottom: "1px solid #f3f4f6",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "40px",
                    sm: "50px",
                  },
                  height: {
                    xs: "40px",
                    sm: "50px",
                  },
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "15px",
                }}
              >
                <Box
                  component="img"
                  src={chat.image}
                  alt={`${chat.name}'s profile`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                    },
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "4px",
                  }}
                >
                  {chat.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "13px",
                      sm: "14px",
                    },
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {chat.message}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  borderRadius: "50%",
                  width: {
                    xs: "20px",
                    sm: "24px",
                  },
                  height: {
                    xs: "20px",
                    sm: "24px",
                  },
                  fontSize: {
                    xs: "11px",
                    sm: "12px",
                  },
                  marginLeft: "10px",
                  backgroundColor: "#f472b6",
                }}
              >
                {chat.count}
              </Box>
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
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default ChatInterface;
