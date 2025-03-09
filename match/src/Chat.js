"use client";
import * as React from "react";
import { useState } from "react";
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  padding: "10px 15px",
  borderRadius: "20px",
  border: "1px solid #eee",
  outline: "none",
  fontSize: "14px",
  "&:focus": {
    borderColor: "#ff69b4",
  },
  "@media (max-width: 640px)": {
    fontSize: "13px",
    padding: "8px 12px",
  },
}));

function ChatComponent() {
  const [messageText, setMessageText] = useState("");

  const sendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending
      setMessageText("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#fff",
        fontFamily: '"Inter", sans-serif',
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          borderBottom: "1px solid #eee",
        }}
      >
        <IconButton sx={{ padding: "5px" }}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          蓉蓉
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: "#999",
            fontSize: "12px",
            margin: "10px 0",
          }}
        >
          2024/01/02 12:34:56
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <Box
            component="img"
            src="https://placehold.co/40x40/f5f5f5/f5f5f5"
            alt="Avatar"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[
              "Hello, 你最近好吗？我们好久没见面了，下次一起逛街哦！",
              "有时间给我打电话。",
              "15366889427",
            ].map((msg, index) => (
              <Box
                key={index}
                sx={{
                  padding: "10px 15px",
                  borderRadius: "20px",
                  maxWidth: {
                    xs: "85%",
                    sm: "70%",
                  },
                  wordWrap: "break-word",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                }}
              >
                {msg}
              </Box>
            ))}
          </Box>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            color: "#999",
            fontSize: "12px",
            margin: "15px 0",
          }}
        >
          09:45
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
          >
            {[
              "好的，我最近在赶一个项目：投资人需要承担的法律义务，强化社会公众风险意识和责任意识。我忙过这阵给你打电话哈。",
              "爱你么么哒",
            ].map((msg, index) => (
              <Box
                key={index}
                sx={{
                  padding: "10px 15px",
                  borderRadius: "20px",
                  maxWidth: {
                    xs: "85%",
                    sm: "70%",
                  },
                  wordWrap: "break-word",
                  fontSize: "14px",
                  backgroundColor: "#ff69b4",
                  color: "#fff",
                }}
              >
                {msg}
              </Box>
            ))}
          </Box>
          <Box
            component="img"
            src="https://placehold.co/40x40/f5f5f5/f5f5f5"
            alt="Avatar"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <Box
            component="img"
            src="https://placehold.co/40x40/f5f5f5/f5f5f5"
            alt="Avatar"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: {
                  xs: "85%",
                  sm: "70%",
                },
                wordWrap: "break-word",
                fontSize: "14px",
                backgroundColor: "#fff",
                border: "1px solid #eee",
              }}
            >
              集美们，冲呀！
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: {
            xs: "10px",
            sm: "15px",
          },
          borderTop: "1px solid #eee",
          gap: "10px",
        }}
      >
        <IconButton sx={{ padding: "10px" }}>
          <EmojiEmotionsIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <StyledInput
            placeholder="输入消息..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </Box>
        <Box
          onClick={sendMessage}
          sx={{
            backgroundColor: "#ff69b4",
            color: "#fff",
            padding: {
              xs: "6px 15px",
              sm: "8px 20px",
            },
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: {
              xs: "13px",
              sm: "14px",
            },
            userSelect: "none",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "#ff4da6",
            },
          }}
        >
          发送
        </Box>
      </Box>
    </Box>
  );
}

export default ChatComponent;
