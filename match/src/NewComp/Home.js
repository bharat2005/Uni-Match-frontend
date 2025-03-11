"use client";
import * as React from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";

const NavIconButton = styled(IconButton)(({ theme, active }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  color: active ? "#ff4d6d" : "#666",
  "&:hover": {
    backgroundColor: "rgba(255, 77, 109, 0.04)",
  },
}));

const NavText = styled("div")(({ active }) => ({
  fontSize: "12px",
  color: active ? "#ff4d6d" : "#666",
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

function AppLayout({ children }) {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <Box
        sx={{
          background: "linear-gradient(180deg, #ffe1e6 0%, #e1e6ff 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "15px", sm: "20px" },
            color: "#000",
          }}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            北京
          </Box>
          <IconButton>
            <i
              className="ti ti-adjustments-horizontal"
              style={{ fontSize: "20px" }}
            />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1 }}>{children}</Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            background: "white",
            padding: { xs: "10px 0", sm: "15px 0" },
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <NavIconButton
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          >
            <i className="ti ti-home" style={{ fontSize: "24px" }} />
            <NavText active={activeTab === "home"}>推荐</NavText>
          </NavIconButton>

          <NavIconButton
            active={activeTab === "compass"}
            onClick={() => setActiveTab("compass")}
          >
            <i className="ti ti-compass" style={{ fontSize: "24px" }} />
            <NavText active={activeTab === "compass"}>发现</NavText>
          </NavIconButton>

          <NavIconButton
            active={activeTab === "star"}
            onClick={() => setActiveTab("star")}
          >
            <StarIconWrapper>
              <i
                className="ti ti-star"
                style={{
                  fontSize: "28px",
                  color: activeTab === "star" ? "#ff4d6d" : "#666",
                  filter: "drop-shadow(0 0 3px rgba(255, 77, 109, 0.3))",
                }}
              />
            </StarIconWrapper>
            <NavText active={activeTab === "star"}>私人订制</NavText>
          </NavIconButton>

          <NavIconButton
            active={activeTab === "messages"}
            onClick={() => setActiveTab("messages")}
          >
            <i className="ti ti-messages" style={{ fontSize: "24px" }} />
            <NavText active={activeTab === "messages"}>消息</NavText>
          </NavIconButton>

          <NavIconButton
            active={activeTab === "user"}
            onClick={() => setActiveTab("user")}
          >
            <i className="ti ti-user" style={{ fontSize: "24px" }} />
            <NavText active={activeTab === "user"}>我的</NavText>
          </NavIconButton>
        </Box>
      </Box>
    </>
  );
}

export default AppLayout;
