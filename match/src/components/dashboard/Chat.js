import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

let socket;

export default function ChatPage({ profile, onBack, match }){
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    
    socket = io("https://api.uni-match.in", {
      path: "/socket.io/", 
      transports: ["websocket", "polling"],  
      withCredentials: true  
  })

    socket.emit("join_room", {target_reg_no: match.reg_no });


    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data])
    })

    socket.on("typing", (data) => {
      if (data["sender_reg_no"] !== match.reg_no) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);  
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
    };
  }, [match.reg_no]);






  function sendMessage(){
    if (message.trim() !== "") {
      socket.emit("send_message", {target_reg_no:match.reg_no, message})
      setMessage("")
    }
  };

  function handleTyping(){
    socket.emit("typing",{});
  };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "80vh", backgroundColor: 'white' }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px", background: "#f8f8f8" }}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={match.images[0]} />
        <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>{match.name}</Typography>
      </Box>


      <Paper sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        "&::-webkit-scrollbar": { display: "none" },
      }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender_reg_no === profile.reg_no ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box sx={{
              backgroundColor: msg.sender_reg_no === profile.reg_no ? "black" : "darkgrey",
              color: "white",
              padding: "10px 15px",
              borderRadius: "15px",
              maxWidth: "75%",
            }}>
              <Typography variant="body2">{msg.content}</Typography>
            </Box>
          </Box>
        ))}
        {isTyping && <Typography variant="caption" sx={{ ml: 1, color: "gray" }}>Typing...</Typography>}
        <div ref={messagesEndRef} />
      </Paper>


      <Box sx={{ display: "flex", alignItems: "center", padding: "10px", background: "#f8f8f8" }}>
        <TextField
          fullWidth
          label="Type a message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleTyping}
          sx={{
            mr: 1,
            "& label": { color: "black" },
            "& .MuiOutlinedInput-root": {
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
            backgroundColor: 'black',
            color: 'white',
            "&:hover": { backgroundColor: "black" },
          }}
        >
          <PaperAirplaneIcon />
        </Button>
      </Box>
    </Box>
  );
};

