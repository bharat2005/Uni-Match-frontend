import React from "react";
import { Box, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Stepper() {
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
        height: "52px", // Fixed height for the navbar
        boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
        zIndex: 5,
      }}
    >
      <NavLink
        to="/app/likes"
        style={{
          textDecoration: "none",
          textDecoration: "none",
          textDecoration: "none",
          outline: "none", // ✅ Removes focus outline from the <a> element
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {({ isActive }) => (
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: isActive ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
            <i className="ti ti-thumb-up-filled" style={{ fontSize: "24px" }} />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: isActive ? "#FE6BA2" : "#666",
              }}
            >
              Likes
            </Box>
          </IconButton>
        )}
      </NavLink>

      <NavLink
        to="/app/matches"
        style={{
          textDecoration: "none",
          textDecoration: "none",
          textDecoration: "none",
          outline: "none", // ✅ Removes focus outline from the <a> element
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {({ isActive }) => (
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: isActive ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
            <i className="ti ti-heart-filled" style={{ fontSize: "24px" }} />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: isActive ? "#FE6BA2" : "#666",
              }}
            >
              Match
            </Box>
          </IconButton>
        )}
      </NavLink>

      <NavLink
        to="/app"
        style={{
          textDecoration: "none",
          textDecoration: "none",
          textDecoration: "none",
          outline: "none", // ✅ Removes focus outline from the <a> element
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {({ isActive }) => (
          <IconButton>
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
                  color: isActive ? "white" : "white",
                  transition: "color 0.3s ease-in-out",
                }}
              />
            </Box>
          </IconButton>
        )}
      </NavLink>

      <NavLink
        to="/app/chats"
        style={{
          textDecoration: "none",
          textDecoration: "none",
          textDecoration: "none",
          outline: "none", // ✅ Removes focus outline from the <a> element
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {({ isActive }) => (
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: isActive ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
            <i
              className="ti ti-message-circle-filled"
              style={{ fontSize: "24px" }}
            />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: isActive ? "#FE6BA2" : "#666",
              }}
            >
              Chats
            </Box>
          </IconButton>
        )}
      </NavLink>

      <NavLink
        to="/app/profile"
        style={{
          textDecoration: "none",
          textDecoration: "none",
          outline: "none", // ✅ Removes focus outline from the <a> element
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {({ isActive }) => (
          <IconButton
            //onClick={() => setActiveTab("profile")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: isActive ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
            <i className="ti ti-user-filled" style={{ fontSize: "24px" }} />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: isActive ? "#FE6BA2" : "#666",
              }}
            >
              Profile
            </Box>
          </IconButton>
        )}
      </NavLink>
    </Box>
  );
}
