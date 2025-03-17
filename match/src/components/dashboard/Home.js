import * as React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import Profilee from "./Profilee";
import NavBar from "./NavBar2";
import Chatsoo from "./Chatsoo";
import Likesoo from "./Likesoo";
import Matchesoo from "./Matchesoo";
import Match from "./Match";
import Modall from "./Modal";
import { Outlet, useLocation } from "react-router-dom";
import Filter from "./Filter";

function AppLayout() {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("clover");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const shouldShowHeader = location.pathname === "/app";

  React.useEffect(() => {
    setName("noti");
  }, []);

  return (
    <>
      <Modall setModalOpen={setName} modalOpen={name} name={name} />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />{" "}
      <Box
        sx={{
          background:
            "linear-gradient(32.33deg, #FEEDFB 40.6%, #FEE5EC 58.42%, #F5E6FF 79.81%, #BFEAFF 100%)",
          //background:'red',
          height: "100vh",
          width: "100vw",
          display: "flex",

          flexDirection: "column",
          position: "relative",
        }}
      >
        {shouldShowHeader && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              zIndex: 0,
              padding:"4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <IconButton sx={{ margin: 0, padding: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "30px",
                    height: "46px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent", // Transparent background
                    transition: "background-color 0.3s ease-in-out",
                  }}
                >
                  <i
                    className="ti ti-clover-filled"
                    style={{
                      fontSize: "24px",
                      background:
                        "linear-gradient(145deg, #ff3c78 0%, #ff79b0 30%, #b985ff 70%, #5caeff 100%)",
                      WebkitBackgroundClip: "text", // Clip background to text
                      WebkitTextFillColor: "transparent", // Make text transparent to show gradient
                      transition: "background 0.3s ease-in-out",
                    }}
                  />
                </Box>
              </IconButton>
              <img
                src="/Uni-match-14-3-2025.png" // Replace with your image path
                alt="clover"
                style={{
                  height: "42px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <i
                className="ti ti-adjustments-horizontal"
                style={{ fontSize: "28px", color: "black" }}
              />
            </IconButton>
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

        <NavBar />
        <Filter isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </Box>
    </>
  );
}

export default AppLayout;
