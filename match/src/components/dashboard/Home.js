"use client";
import * as React from "react";
import { Box, IconButton } from "@mui/material";
import Chatsoo from './Match';
import NavBar from './NavBar2';

function AppLayout({ children }) {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
/>  <Box
        sx={{
          background: "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
          height: "95dvh",
          width:'100vw',
          display: "flex",
          paddingTop:'10%',
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom:'0%',
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
            Uni-Match
          </Box>
          <IconButton>
            <i
              className="ti ti-adjustments-horizontal"
              style={{ fontSize: "26px", color:'black' }}
            />
          </IconButton>
        </Box>





        <Box sx={{ flex: 1 }}>
          <Chatsoo/>
          </Box>

 

<NavBar activeTab={activeTab} setActiveTab={setActiveTab}/>
      </Box>
    </>
  );
}

export default AppLayout;
