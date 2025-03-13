"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

const ChatComponent = ({setChatt}) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, 你最近好吗？", sender: "other" },
    { id: 2, text: "有时间给我打电话。", sender: "other" },
    { id: 3, text: "15366889427", sender: "other" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 5, text: "爱你么么哒", sender: "me" },
    { id: 6, text: "集美们，冲呀！", sender: "other" },
    { id: 6, text: "集美们，冲呀！", sender: "other" },
    { id: 6, text: "集美们，冲呀！", sender: "other" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 5, text: "爱你么么哒", sender: "me" },
    { id: 5, text: "爱你么么哒", sender: "me" },
    { id: 2, text: "有时间给我打电话。", sender: "other" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 1, text: "Hello, 你最近好吗？", sender: "other" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 5, text: "爱你么么哒", sender: "me" },
    { id: 2, text: "有时间给我打电话。", sender: "other" },
    { id: 3, text: "15366889427", sender: "other" },
    { id: 4, text: "好的，我最近在赶一个项目", sender: "me" },
    { id: 5, text: "爱你么么哒", sender: "me" },
    { id: 6, text: "集美们，冲呀！", sender: "other" },
    { id: 6, text: "集美们，冲呀！", sender: "other" },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: messageText, sender: "me" },
      ]);
      setMessageText("");
    }
  };

  return (
    <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#fff",
      fontFamily: '"Inter", sans-serif',
      zIndex: 9999, // Make sure it stays on top
    }}
  
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          borderBottom: "1px solid #eee",
          flexShrink: 0, // Prevent shrinking on small screens
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <IconButton 
        sx={{ padding: "5px" }}
        onPointerDown={()=> {setChatt(false)}}
        >
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

      {/* CHAT WINDOW */}
      <Box
        sx={{
          flex: 1,
          padding: "15px",
          overflowY: "auto", // Only this part should be scrollable
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          "&::-webkit-scrollbar": {
            display: "none",
          },

          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              gap: "10px",
            }}
          >
            {msg.sender !== "me" && (
              <Avatar
                src="https://placehold.co/40x40/f5f5f5/f5f5f5"
                alt="Avatar"
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
            <Box
              sx={{
                padding: "10px 15px",
                borderRadius: "20px",
                fontSize: "14px",
                maxWidth: "70%",
                wordWrap: "break-word",
                backgroundColor:
                  msg.sender === "me" ? "#ff69b4" : "#f5f5f5",
                color: msg.sender === "me" ? "#fff" : "#111",
                border: msg.sender !== "me" ? "1px solid #eee" : "none",
              }}
            >
              {msg.text}
            </Box>
            {msg.sender === "me" && (
              <Avatar
                src="https://placehold.co/40x40/f5f5f5/f5f5f5"
                alt="Avatar"
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* INPUT AREA */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 15px",
          borderTop: "1px solid #eee",
          gap: "10px",
          flexShrink: 0, // Prevent resizing on small screens
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <IconButton sx={{ padding: "10px" }}>
          <EmojiEmotionsIcon />
        </IconButton>
        {/* TextField for input */}
        <TextField
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Message"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
          }}
        />
        <IconButton onClick={sendMessage} sx={{ color: "#ff69b4" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatComponent;

