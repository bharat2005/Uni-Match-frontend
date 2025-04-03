"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../AuthProvider";
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, onSnapshot, writeBatch } from "firebase/firestore";
import { Box, Typography, TextField, IconButton, Avatar } from "@mui/material";
import { useNavigate, useOutletContext  } from "react-router-dom";


const ChatComponent = () => {
  const { selfprofile, chatProfile } = useAuth();
  const [messageText, setMessageText] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [textMessages, setTextMessages] = useState([]);
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  }, [textMessages]);


      useEffect(() => {
  
      const unsubscribe = onSnapshot(query(collection(db, "chats", chatProfile.match_instance.match_id, "messages"), orderBy("timestamp")),
      (response)=> {
          setTextMessages(response.docs.map(doc => doc.data()))
          const unSeenTextMessages = response.docs.filter(doc => doc.data().status == "unseen" && doc.data().sender_reg_no  != selfprofile.reg_no)
          if (unSeenTextMessages.length > 0){
            const batch = writeBatch(db)
            unSeenTextMessages.forEach(docSnap => {
              batch.update(docSnap.ref, {status:"seen"})
            })
            batch.commit()
            .then(()=> {
              console.log("Messages updated to seen")
            })
            .catch(()=> {
              console.log("Error in updating messages to seen")
            })
          }
      },
      (error)=> {
          console.error("Error", error)
      })
  
      return unsubscribe
  
      }, [chatProfile.match_instance.match_id]);











      useEffect(() => {
        const handleResize = () => {
          const viewportHeight = window.visualViewport.height;
          
          document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
      
          // Prevent body scrolling when keyboard is open
          if (viewportHeight < window.innerHeight) {
            document.body.style.overflow = "hidden"; 
          } else {
            document.body.style.overflow = "";
          }
        };
      
        window.visualViewport.addEventListener("resize", handleResize);
        handleResize();
      
        return () => {
          window.visualViewport.removeEventListener("resize", handleResize);
          document.body.style.overflow = ""; // Reset on cleanup
        };
      }, []);
      















      function handleSend() {
        if (!message.trim()) return;
      
        const tempMessage = message;
        setMessage("");
      
        // Ensure focus remains on input after message is sent
        setTimeout(() => {
          messageInputRef.current?.focus();
        }, 10);
      
        addDoc(collection(db, "chats", chatProfile.match_instance.match_id, "messages"), {
          sender_reg_no: selfprofile.reg_no,
          receiver_reg_no: chatProfile.match_user_data.reg_no,
          text: tempMessage,
          status: "unseen",
          timestamp: serverTimestamp(),
        })
          .then((docRef) => {
            console.log("Message sent successfully!", docRef.id);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
      

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "var(--app-height)",
          backgroundColor: "#fff",
          fontFamily: '"Inter", sans-serif',
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px 20px 12px 20px",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 10,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
        <IconButton
          sx={{
            padding: "5px",
            marginLeft: "8px",
            position: "absolute",
            left: 0,
          }}
          onPointerDown={() => navigate(-1)}
        >
          <i
            className="ti ti-chevron-left"
            style={{ fontSize: "24px", color: "black" }}
          ></i>
        </IconButton>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#212121",
          }}
        >
          {chatProfile.match_user_data.name}
        </Typography>
      </Box>

      {/* CHAT WINDOW */}
      <Box
        sx={{
          flex: 1,
          padding: "15px",
          paddingTop:'75px',
          overflowY: "auto",
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {textMessages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender_reg_no === selfprofile.reg_no ? "flex-end" : "flex-start",
              gap: "10px",
            }}
          >
            {msg.sender_reg_no !== selfprofile.reg_no && (
              <Avatar
                src={chatProfile.match_user_data.images[0]}
                alt="Avatar"
                sx={{
                  width: "40px",
                  height: "40px",
                }}
                imgProps={{
                  onLoad: (e) => (e.target.style.opacity = 1), // Smooth fade-in
                  onError: (e) => (e.target.src = "/4.jpg"), // Fallback image
                  style: { opacity: 0, transition: "opacity 0.3s ease-in-out" },
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
                backgroundColor: msg.sender_reg_no === selfprofile.reg_no ? "#FE6BA2" : "#FFFFFF",
                color: msg.sender_reg_no === selfprofile.reg_no ? "#FFFFFF" : "#111",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                border: msg.sender_reg_no !== selfprofile.reg_no ? "1px solid #eee" : "none",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </Box>
            {msg.sender_reg_no === selfprofile.reg_no && (
              <Avatar
                src={selfprofile.images[0]}
                alt="Avatar"
                sx={{
                  width: "40px",
                  height: "40px",
                }}
                imgProps={{
                  onLoad: (e) => (e.target.style.opacity = 1), // Smooth fade-in
                  onError: (e) => (e.target.src = "/4.jpg"), // Fallback image
                  style: { opacity: 0, transition: "opacity 0.3s ease-in-out" },
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

        {/* TextField */}
        <TextField
          value={message}
          autoComplete="off"
          inputRef={messageInputRef}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim()) handleSend();
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
              border: "none",
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px",
              border: "none",
            },
            "& fieldset": {
              borderColor: "transparent",
              border: "none",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
              border: "none",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
              border: "none",
            },
          }}
        />

        {/* Send Icon */}
        <IconButton
          onClick={handleSend}
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
