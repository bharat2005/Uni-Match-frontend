import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const socket = io("https://api.uni-match.in");

const room = "ab35e84a215f0f711ed629c2abb9efa0"

const ChatPage = ({ onBack, match }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   socket.emit("join_room", { room});

  //   socket.emit("bharat",{room, receiver_reg_no: match.reg_no});

  //   socket.on("bharat", (data) => {
  //     setMessages(data)
  //   });
  //   return () => {
  //     socket.off("bharat");
  //   };
  // }, [room]);

  // function sendMessage(){
  //   if (message.trim() !== "") {
  //     const messageData = { receiver_reg_no: match.reg_no , message,  room: room, type:'message', is_seen:'unseen' };
  //     socket.emit("bharat", messageData);
  //     setMessage("");
  //   }
  // };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", height: "78vh", backgroundColor: 'white' }}>
      
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'left', padding: "10px" }}>
        <IconButton onClick={onBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={match.images[0]} />
        <Typography variant="h6" sx={{ marginLeft: '15px', textAlign: "center", fontWeight: "bold" }}>{match.name}</Typography>
      </Box>

      
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
              justifyContent: msg.sender_reg_no === 12413923 ? "flex-end" : "flex-start",
              mb: 1,
              wordWrap: "break-word",
              whiteSpace: "normal",  
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box
                sx={{
                  backgroundColor: msg.sender_reg_no === 12413923 ? "black" : "darkgrey",
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

export default ChatPage;