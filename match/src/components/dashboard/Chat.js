import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';

const socket = io("http://127.0.0.1:5000");

const room = "f0f421418433ba3cb592238eb7e51441"

const ChatPage = ({ onBack, match, user_id }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", { room: room, user_id: user_id });

    socket.emit("bharat",{room, sender_id: user_id, receiver_id: match.user_id});

    socket.on("bharat", (data) => {
      setMessages(data)
    });
    return () => {
      socket.off("bharat");
    };
  }, [room]);

  function sendMessage(){
    if (message.trim() !== "") {
      const messageData = { sender_id: user_id, receiver_id: match.user_id , message: message, room: room };
      socket.emit("bharat", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%", backgroundColor: 'white' }}>
      
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'left', padding: "10px" }}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={match.images[0]} />
        <Typography variant="h6" sx={{ marginLeft: '15px', textAlign: "center", fontWeight: "bold" }}>{match.name}</Typography>
      </Box>

      {/* Chat Messages */}
      <Paper sx={{
        p: 2,
        flex: 1,
        overflowY: "auto",
        boxShadow: 0,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender_id === user_id ? "flex-end" : "flex-start",
              mb: 1,
              wordWrap: "break-word",
              whiteSpace: "normal",  
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box
                sx={{
                  backgroundColor: msg.sender_id === user_id ? "black" : "darkgrey",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                  wordWrap: "break-word",  
                  whiteSpace: "normal",    
                  display: "inline-block", 
                  flexShrink: 0,         
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Input Section */}
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <TextField
          fullWidth
          label="Type a message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            mr: 1,
            "& label": { color: "black" },
            "& label.Mui-focused": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
            },
          }}
          size="small"
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            padding: "10px",
            borderRadius: "50%",
            minWidth: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'black',
            color: 'black',
            "&:hover": { backgroundColor: "black" },
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;