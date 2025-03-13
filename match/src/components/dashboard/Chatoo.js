"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";

const ChatComponent = ({setChatt}) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello？", sender: "other" },
    { id: 2, text: "are you there", sender: "other" },
    { id: 3, text: "hey!!!1", sender: "other" },
    { id: 4, text: "bolo?", sender: "me" },
    { id: 5, text: "mujhe kaam hai", sender: "me" },
    { id: 6, text: "pleaseee", sender: "other" },
    { id: 6, text: "i wanna talk with you right now!", sender: "other" },
    { id: 6, text: "pleaswee...", sender: "other" },
    { id: 4, text: "thinki hsu", sender: "me" },
    { id: 5, text: "jaldi bolo", sender: "me" },
    { id: 5, text: "ab bol bhi do!", sender: "me" },
    { id: 2, text: "nahi abhi nahi!!!", sender: "other" },
    {id: 3, text: "hey!!!1", sender: "other" },
    { id: 4, text: "bolo?", sender: "me" },
    { id: 5, text: "mujhe kaam hai", sender: "me" },
    { id: 6, text: "pleaseee", sender: "other" },
    { id: 6, text: "i wanna talk with you right now!", sender: "other" },
    { id: 6, text: "pleaswee...", sender: "other" },
    { id: 4, text: "thinki hsu", sender: "me" },
    { id: 5, text: "jaldi bolo", sender: "me" },
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
      setTimeout(() => messageInputRef.current?.focus(), 0)
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
          justifyContent:'flex-end',
          padding: "14px",
          //borderBottom: "1px solid #eee",
          flexShrink: 0, // Prevent shrinking on small screens
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            marginTop:'14%'
          }}
        >
        <IconButton 
         sx={{ padding: "5px", position:'absolute', left:8 }}
         onPointerDown={()=> {setChatt(false)}}
         >
           <i className="ti ti-chevron-left" style={{ fontSize: "24px", color:'black' }}></i>
         </IconButton>
          Bharat
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
          backgroundColor:'#F5F5F5',
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
                src="5.jpg"
                alt="Avatar"
                sx={{
                  width: "48px",
                  height: "48px",
                }}
              />
            )}
            <Box
              sx={{
                padding: "13px 20px", // Bigger padding
                borderRadius: "14px",
                fontSize: "18px", // Bigger font size
                lineHeight: "1.4",
                maxWidth: "70%",
                minHeight:'100%',
                wordWrap: "break-word",
                backgroundColor:
                  msg.sender === "me" ? "#FE6BA2" : "#FFFFFF",
                color: msg.sender === "me" ? "#FFFFFF" : "#111",
                //boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Soft shadow
                border: msg.sender !== "me" ? "1px solid #eee" : "none",
              }}
            >
              {msg.text}
            </Box>
            {msg.sender === "me" && (
              <Avatar
                src="/4.avif"
                alt="Avatar"
                sx={{
                  width: "48px",
                  height: "48px",
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
          padding: "6px 12px",
          borderTop: "1px solid #eee",
          gap: "10px",
          flexShrink: 0, // Prevent resizing on small screens
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <IconButton sx={{ padding: "10px", color:'black', margin:0, padding:0 }}>
        <i className="ti ti-mood-smile" style={{ fontSize: "36px" }} />
        </IconButton>
        {/* TextField for input */}
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
            background:'#F5F5F5',
            wordWrap: "break-word",
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'transparent', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Soft blue when focused
              },}

          }}
        />
        <IconButton onClick={sendMessage} sx={{ color: "#FE6BA2", margin:0, padding:0 }}>
        <i className="ti ti-send-2" style={{ fontSize: "36px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatComponent;

