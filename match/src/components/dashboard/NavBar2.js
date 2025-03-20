import React from "react";
import { Box, IconButton,Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Stepper({likesNoti, matchesNoti}) {
  const navigate = useNavigate();
  const location = useLocation(); 


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



          <IconButton
          onClick={() => navigate("/app/likes")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: location.pathname === "/app/likes" ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          ><i className="ti ti-thumb-up-filled" style={{ fontSize: "24px" }} />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: location.pathname === "/app/likes" ? "#FE6BA2" : "#666",
              }}
            >
              Likes
            </Box>
          </IconButton>


          <IconButton
          onClick={() => navigate("/app/matches")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: location.pathname === "/app/matches" ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
        <Badge
            badgeContent={likesNoti.length > 0 ? likesNoti.length : null}
            sx={{ display: "flex", justifyContent: "center",
              "& .MuiBadge-badge": { backgroundColor: "#FE6BA2", color: "white" },
             }}
          ><i className="ti ti-heart-filled" style={{ fontSize: "24px" }} />
          </Badge>
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: location.pathname === "/app/matches" ? "#FE6BA2" : "#666",
              }}
            >
              Match
            </Box>
          </IconButton>



          <IconButton
          onClick={() => navigate("/app/home")}>
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
                  color: location.pathname === "/app/home" ? "white" : "white",
                  transition: "color 0.3s ease-in-out",
                }}
              />
            </Box>
          </IconButton>



          <IconButton
          onClick={() => navigate("/app/chats")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: location.pathname === "/app/chats" ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          > <Badge
          badgeContent={matchesNoti.length > 0 ? matchesNoti.length : null}
          sx={{ display: "flex", justifyContent: "center",
            "& .MuiBadge-badge": { backgroundColor: "#FE6BA2", color: "white" },
           }}
        ><i className="ti ti-message-circle-filled"
            style={{ fontSize: "24px" }}
            /></Badge>
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: location.pathname === "/app/chats" ? "#FE6BA2" : "#666",
              }}
            >
              Chats
            </Box>
          </IconButton>
 


          <IconButton
            onClick={() => navigate("/app/profile")}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              color: location.pathname === "/app/profile" ? "#FE6BA2" : "black",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 109, 0.04)",
              },
            }}
          >
            <i className="ti ti-user-filled" style={{ fontSize: "24px" }} />
            <Box
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: location.pathname === "/app/profile" ? "#FE6BA2" : "#666",
              }}
            >
              Profile
            </Box>
          </IconButton>
    </Box>
  );
}
