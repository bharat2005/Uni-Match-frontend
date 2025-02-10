import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';

const socket = io("http://127.0.0.1:5000");

const ChatPage = ({ matchId = "123", currentUser = "bharat", onBack, match }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", { room: matchId });
    socket.on("bharat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("bharat");
    };
  }, [matchId, currentUser]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = { user: currentUser, text: message, room: matchId };
      socket.emit("bharat", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ width: "500px", mx: "auto", p: 2, display: "flex", flexDirection: "column", height: "95%", boxShadow: 2, bgcolor: 'background.paper' }}>
      
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'left', padding: "10px" }}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={match.image} />
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
              justifyContent: msg.user === currentUser ? "flex-end" : "flex-start",
              mb: 1,
              wordWrap: "break-word", // Ensures long words break correctly
              whiteSpace: "normal",   // Ensures text wraps instead of overflowing
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box
                sx={{
                  backgroundColor: msg.user === currentUser ? "black" : "darkgrey",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                  wordWrap: "break-word",  // Prevents long words from causing overflow
                  whiteSpace: "normal",    // Ensures wrapping
                  display: "inline-block", // Keeps box aligned properly
                  flexShrink: 0,          // Prevents shrinking of the message box
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
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
            backgroundColor: '#ffbf00',
            color: 'black',
            "&:hover": { backgroundColor: "#ffbf00" },
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
