"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";

const ChatComponent = ({ setChatt }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello？", sender: "other" },
    { id: 2, text: "Are you there?", sender: "other" },
    { id: 3, text: "Hey!!!", sender: "other" },
    { id: 4, text: "Bolo?", sender: "me" },
    { id: 5, text: "Mujhe kaam hai", sender: "me" },
    { id: 6, text: "Pleaseee", sender: "other" },
    { id: 7, text: "I wanna talk with you right now!", sender: "other" },
    { id: 8, text: "Thinki hsu", sender: "me" },
    { id: 9, text: "Jaldi bolo", sender: "me" },
    { id: 1, text: "Hello？", sender: "other" },
    { id: 2, text: "Are you there?", sender: "other" },
    { id: 3, text: "Hey!!!", sender: "other" },
    { id: 4, text: "Bolo?", sender: "me" },
    { id: 5, text: "Mujhe kaam hai", sender: "me" },
    { id: 6, text: "Pleaseee", sender: "other" },
    { id: 7, text: "I wanna talk with you right now!", sender: "other" },
    { id: 8, text: "Thinki hsu", sender: "me" },
    { id: 9, text: "Jaldi bolo", sender: "me" },
    { id: 1, text: "Hello？", sender: "other" },
    { id: 2, text: "Are you there?", sender: "other" },
    { id: 3, text: "Hey!!!", sender: "other" },
    { id: 4, text: "Bolo?", sender: "me" },
    { id: 5, text: "Mujhe kaam hai", sender: "me" },
    { id: 6, text: "Pleaseee", sender: "other" },
    { id: 7, text: "I wanna talk with you right now!", sender: "other" },
    { id: 8, text: "Thinki hsu", sender: "me" },
    { id: 9, text: "Jaldi bolo", sender: "me" },
    { id: 1, text: "Hello？", sender: "other" },
    { id: 2, text: "Are you there?", sender: "other" },
    { id: 3, text: "Hey!!!", sender: "other" },
    { id: 4, text: "Bolo?", sender: "me" },
    { id: 5, text: "Mujhe kaam hai", sender: "me" },
    { id: 6, text: "Pleaseee", sender: "other" },
    { id: 7, text: "I wanna talk with you right now!", sender: "other" },
    { id: 8, text: "Thinki hsu", sender: "me" },
    { id: 9, text: "Jaldi bolo", sender: "me" },
  ]);

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

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
      setTimeout(() => messageInputRef.current?.focus(), 0);
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
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "28px 20px 12px 20px",
          justifyContent:'center',
          position: "sticky",
          top: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 10,
          borderBottom: "1px solid #eee",
        }}
      >
        <IconButton
          sx={{ padding: "5px", marginLeft: "8px", position:'absolute', left:0 }}
          onPointerDown={() => setChatt(false)}
        >
          <i
            className="ti ti-chevron-left"
            style={{ fontSize: "24px", color: "black" }}
          ></i>
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#212121",
          }}
        >
          Bharat
        </Typography>
      </Box>

      {/* CHAT WINDOW */}
      <Box
        sx={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent:
                msg.sender === "me" ? "flex-end" : "flex-start",
              gap: "10px",
            }}
          >
            {msg.sender !== "me" && (
              <Avatar
                src="5.jpg"
                alt="Avatar"
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
            <Box
              sx={{
                padding: "12px 18px",
                borderRadius: "16px",
                fontSize: "16px",
                lineHeight: "1.4",
                maxWidth: "70%",
                backgroundColor:
                  msg.sender === "me" ? "#FE6BA2" : "#FFFFFF",
                color: msg.sender === "me" ? "#FFFFFF" : "#111",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                border:
                  msg.sender !== "me" ? "1px solid #eee" : "none",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </Box>
            {msg.sender === "me" && (
              <Avatar
                src="/4.avif"
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
          padding: "8px 12px",
          borderTop: "1px solid #eee",
          gap: "8px",
          backgroundColor: "#FFFFFF",
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        {/* Emoji Icon */}
        <IconButton sx={{ padding: "5px", color: "black" }}>
          <i className="ti ti-mood-smile" style={{ fontSize: "28px" }} />
        </IconButton>

        {/* TextField */}
        <TextField
          value={messageText}
          inputRef={messageInputRef}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Message"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            background: "#F5F5F5",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          }}
        />

        {/* Send Icon */}
        <IconButton
          onClick={sendMessage}
          sx={{
            color: "#FE6BA2",
          }}
        >
          <i className="ti ti-send-2" style={{ fontSize: "28px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatComponent;
