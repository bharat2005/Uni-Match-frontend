import React, { useState, useRef } from "react";
import { TextField, IconButton, Popover } from "@mui/material";
import "emoji-mart/css/emoji-mart.css";  // ✅ Works only with v3
import { Picker } from "emoji-mart";
 // ✅ Correct import for new version



const ChatInput = ({ message, setMessage, handleSend }) => {
  const [anchorEl, setAnchorEl] = useState(null); // For emoji picker popup
  const messageInputRef = useRef(null);

  // Open Emoji Picker
  const openEmojiPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Emoji Picker
  const closeEmojiPicker = () => {
    setAnchorEl(null);
  };

  // Add selected emoji to the message input
  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    messageInputRef.current.focus(); // Refocus the input field
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Emoji Picker Button */}
      <IconButton onClick={openEmojiPicker} sx={{ color: "#FE6BA2" }}>
        <i className="ti ti-mood-smile" style={{ fontSize: "28px" }} />
      </IconButton>

      {/* Emoji Picker Popup */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeEmojiPicker}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker onSelect={addEmoji} />
      </Popover>

      {/* Message Input Field */}
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
        }}
      />

      {/* Send Button */}
      <IconButton onClick={handleSend} sx={{ color: "#FE6BA2" }}>
        <i className="ti ti-send-2" style={{ fontSize: "28px" }} />
      </IconButton>
    </div>
  );
};

export default ChatInput;
