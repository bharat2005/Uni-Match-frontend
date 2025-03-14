import React from "react";
import { Box, IconButton } from "@mui/material";

export default function Stepper({ activeTab, setActiveTab }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "white",
        padding: { xs: "2px 0", sm: "3px 0" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* Likes */}
      <IconButton
        onClick={() => setActiveTab("likes")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          color: activeTab === "likes" ? "#FE6BA2" : "black",
          "&:hover": {
            backgroundColor: "rgba(255, 77, 109, 0.04)",
          },
        }}
      >
        <i className="ti ti-thumb-up-filled" style={{ fontSize: "24px" }} />
        <Box
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            color: activeTab === "likes" ? "#FE6BA2" : "#666",
          }}
        >
          Likes
        </Box>
      </IconButton>

      {/* Match */}
      <IconButton
        onClick={() => setActiveTab("match")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          color: activeTab === "match" ? "#FE6BA2" : "black",
          "&:hover": {
            backgroundColor: "rgba(255, 77, 109, 0.04)",
          },
        }}
      >
        <i className="ti ti-heart-filled" style={{ fontSize: "24px" }} />
        <Box
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            color: activeTab === "match" ? "#FE6BA2" : "#666",
          }}
        >
          Match
        </Box>
      </IconButton>

      {/* Star */}
      <IconButton onClick={() => setActiveTab("clover")}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background:
              "linear-gradient(145deg, #ff4f8b 0%, #ff92c6 30%, #d0b3ff 70%, #98d9ff 100%)",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          <i
            className="ti ti-clover-filled"
            style={{
              fontSize: "34px",
              color: activeTab === "clover" ? "white" : "white",
              transition: "color 0.3s ease-in-out",
            }}
          />
        </Box>
      </IconButton>

      {/* Chats */}
      <IconButton
        onClick={() => setActiveTab("chats")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          color: activeTab === "chats" ? "#FE6BA2" : "black",
          "&:hover": {
            backgroundColor: "rgba(255, 77, 109, 0.04)",
          },
        }}
      >
        <i className="ti ti-message-circle-filled" style={{ fontSize: "24px" }} />
        <Box
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            color: activeTab === "chats" ? "#FE6BA2" : "#666",
          }}
        >
          Chats
        </Box>
      </IconButton>

      {/* Profile */}
      <IconButton
        onClick={() => setActiveTab("profile")}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          color: activeTab === "profile" ? "#FE6BA2" : "black",
          "&:hover": {
            backgroundColor: "rgba(255, 77, 109, 0.04)",
          },
        }}
      >
        <i className="ti ti-user-filled" style={{ fontSize: "24px" }} />
        <Box
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            color: activeTab === "profile" ? "#FE6BA2" : "#666",
          }}
        >
          Profile
        </Box>
      </IconButton>
    </Box>
  );
}
