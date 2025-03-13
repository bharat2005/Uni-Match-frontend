import * as React from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";


const NavIconButton = styled(IconButton)(({ theme, active }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    color: active ? "#FE6BA2" : "black",
    "&:hover": {
      backgroundColor: "rgba(255, 77, 109, 0.04)",
    },
  }));
  const GradientIconWrapper = styled(Box)(({ active }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background:
      "linear-gradient(145deg, #ff4f8b 0%, #ff92c6 30%, #d0b3ff 70%, #98d9ff 100%)",
    transition: "background-color 0.3s ease-in-out",
  }));
  
  const GradientIcon = styled("i")(({ active }) => ({
    fontSize: "32px",
    color: active ? "#C8A2C8" : "#ffffff", // Fill icon color on selection
    transition: "color 0.3s ease-in-out",
    "@media (max-width: 640px)": {
      fontSize: "24px",
    },
  }));
  
  
  
  const NavText = styled("div")(({ active }) => ({
    fontSize: "12px",
    color: active ? "#FE6BA2" : "#666",
    "@media (max-width: 640px)": {
      fontSize: "10px",
    },
  }));
  
  const StarIconWrapper = styled(Box)({
    animation: "pulse 2s infinite",
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
      },
      "50%": {
        transform: "scale(1.1)",
      },
      "100%": {
        transform: "scale(1)",
      },
    },
  });




export default function Stepper({activeTab, setActiveTab}){

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
  // borderTopLeftRadius: "20px",
  // borderTopRightRadius: "20px",
}}
>
<NavIconButton
  active={activeTab === "home"}
  onClick={() => setActiveTab("home")}
>
  <i className="ti ti-thumb-up-filled" style={{ fontSize: "24px" }} />
  <NavText active={activeTab === "home"}>Likes</NavText>
</NavIconButton>

<NavIconButton
  active={activeTab === "compass"}
  onClick={() => setActiveTab("compass")}
>
  <i className="ti ti-heart-filled" style={{ fontSize: "24px" }} />
  <NavText active={activeTab === "compass"}>Match</NavText>
</NavIconButton>


<NavIconButton
active={activeTab === "star"}
onClick={() => setActiveTab("star")}
>
<GradientIconWrapper>
<GradientIcon className="ti ti-clover-filled" style={{ fontSize: "34px", color: activeTab=="star"?"white":'white'}} />
</GradientIconWrapper>
</NavIconButton>

<NavIconButton
  active={activeTab === "messages"}
  onClick={() => setActiveTab("messages")}
>
  <i className="ti ti-message-circle-filled" style={{ fontSize: "24px" }} />
  <NavText active={activeTab === "messages"}>Chats</NavText>
</NavIconButton>

<NavIconButton
  active={activeTab === "user"}
  onClick={() => setActiveTab("user")}
>
  <i className="ti ti-user-filled" style={{ fontSize: "24px" }} />
  <NavText active={activeTab === "user"}>Profile</NavText>
</NavIconButton>
</Box>
    )

}