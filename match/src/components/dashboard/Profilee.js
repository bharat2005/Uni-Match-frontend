import React, {useEffect, useState} from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LogOutModal from './LogOutModal';
import {
  Timeline,
  AccountCircle,
  Shield,
  Rocket,
  QuestionAnswer,
  Settings,
  ChevronRight,
  Logout,
  PersonRemove,
} from "@mui/icons-material";
import About from "./About";
import Delete from "./DeleteProfile";
import Support from "./Support";
import EditStepForm from "./Edit";
import Modal from "./Modal2.0";
import {useAuth} from '../../AuthProvider';

const ProfileContainer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { lpuselfprofile, selfprofile } = useAuth();
  const isMobile = useMediaQuery("(max-width:640px)");
  const isTablet = useMediaQuery("(max-width:991px)");
  const [logOutModalOpen, setLogOutModalOpen] = React.useState(false)
  const [open, setOpen] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  console.log(`Profilee --selfprofile-->${selfprofile}\n lpuselfprofile--->${lpuselfprofile}`)
  // useEffect(() => {
  //   axios
  //     .get("https://api.uni-match.in/profilecomp", {
  //       withCredentials: true,
  //       headers: { "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess") },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setLpuSelfProfile(response.data.lpuselfprofile);
  //       setSelfProfile(response.data.selfprofile);
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);

  //       if (error.response?.status === 401) {
  //         axios
  //           .post(
  //             "https://api.uni-match.in/refresh",
  //             {},
  //             {
  //               withCredentials: true,
  //               headers: {
  //                 "X-CSRF-TOKEN": localStorage.getItem("csrfTokenRefresh"),
  //               },
  //             },
  //           )

  //           .then((response) => {
  //             const csrfTokenAccess = response.headers["x-csrf-token-access"];
  //             localStorage.setItem("csrfTokenAccess", csrfTokenAccess);

  //             axios
  //               .get("https://api.uni-match.in/profilecomp", {
  //                 withCredentials: true,
  //                 headers: {
  //                   "X-CSRF-TOKEN": localStorage.getItem("csrfTokenAccess"),
  //                 },
  //               })
  //               .then((response) => {
  //                 console.log("Protected Data (After Refresh):", response.data);
  //                 setLpuSelfProfile(response.data.lpuselfprofile);
  //                 setSelfProfile(response.data.selfprofile);
  //               })
  //               .catch((retryError) =>
  //                 console.error("Failed after refresh:", retryError),
  //               );
  //           })
  //           .catch(() =>
  //             console.error("Session expired, please log in again."),
  //           );
  //       }
  //     });
  // }, []);





  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Uni-Match - Connecting ❤️ of LPU',
          text: "✨ Ready to meet new people at LPU? Uni-Match makes it easy to connect with fellow students — whether you're looking for friendship, love, or just someone to vibe with! ❤️",
          url:'https://uni-match.in',
        })
        .then(() => {
          console.log('Content shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing content:', error);
        });
    } else {
      alert('Your browser does not support the share feature');
    }
  };
  

  const containerStyles = {
    background:
      "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
    fontFamily: '"Inter", sans-serif',
    padding: {
      xs: "40px 12px",
      sm: "40px 16px",
      md: "40px 20px",
    },
    minHeight: {
      xs: "calc(100vh - env(safe-area-inset-bottom))",
      md: "100vh",
    },
    height: {
      xs: "auto",
      md: "100%",
    },
    overflowY: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    paddingBottom: {
      xs: "20px",
    },
  };

  const profileHeaderStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: {
      xs: "16px 20px",
      sm: "20px 28px",
      md: "24px 32px",
    },
    borderRadius: "20px",
    margin: "34px 0",
    background: "transparent",
    overflow: "hidden",
  };

  const menuListStyles = {
    backgroundColor: "#fff",
    marginTop: "10px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  };

  const menuItemStyles = {
    padding: {
      xs: "14px",
      sm: "16px",
      md: "18px",
    },
    borderBottom: "1px solid #f0f0f0",
    "&:hover": {
      backgroundColor: "#f8f9fa",
    },
  };

  const actionButtonsStyles = {
    padding: {
      xs: "16px 12px",
      sm: "16px 14px",
      md: "20px 16px",
    },
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: {
      xs: "33px",
    },
    paddingBottom: {
      xs: "31px",
    },
  };

  const menuItems = [
    {
      icon: (
        <i
          className="ti ti-edit"
          style={{ fontSize: "24px", color: "black" }}
        />
      ),
      text: "Edit Profile",
    },
    {
      icon: (
        <i
          className="ti ti-share"
          style={{ fontSize: "24px", color: "black" }}
        />
      ),
      text: "Share",
    },
    {
      icon: (
        <i
          className="ti ti-info-circle"
          style={{ fontSize: "24px", color: "black" }}
        />
      ),
      text: "About Developer",
    },
    {
      icon: (
        <i
          className="ti ti-heart-handshake"
          style={{ fontSize: "24px", color: "black" }}
        />
      ),
      text: "Support Us",
    },
    {
      icon: (
        <i
          className="ti ti-trash"
          style={{ fontSize: "24px", color: "black" }}
        />
      ),
      text: "Delete Profile",
    },
  ];

  if (open) {
    switch (open) {
      case "Edit Profile": {
        return <EditStepForm onClose={() => setOpen(false)} />;
      }
      case "About Developer": {
        return <About onClose={() => setOpen(false)} />;
      }
      case "Support Us": {
        return <Support onClose={() => setOpen(false)} />;
      }
      case "Delete Profile": {
        return <Delete onClose={() => setOpen(false)} />;
      }
    }
  }

  return (
    <>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} name={"share"} handleShare={handleShare} />
      <LogOutModal open={logOutModalOpen} handleClose={()=> setLogOutModalOpen(false)}/>


      <Box sx={containerStyles}>
        <Box sx={profileHeaderStyles}>
          <Avatar
            src={lpuselfprofile.image}
            alt="Profile"
            sx={{
              width: { xs: "90px", md: "90px" },
              height: { xs: "90px", md: "90px" },
              marginBottom: "10px",
              border:'2px solid #fd7e14'
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "20x" },
              fontWeight: 600,
              color: "#333",
              marginBottom: "5px",
            }}
          >
            {lpuselfprofile.name}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#ffc107",
              padding: "6px 10px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <i
              className="ti ti-id"
              style={{ fontSize: "20px", marginRight: "2px" }}
            />
            {lpuselfprofile.reg_no}
          </Box>
        </Box>

        <Box sx={menuListStyles}>
          <List disablePadding>
            {menuItems.map((item, index) => (
              <ListItem
              onClick={() => {
                if (item.text === "Share") {
                  setModalOpen(true);
                } else if (item.text === "Edit Profile") {
                  navigate('/app/profile/edit');
                } else if (item.text === "About Developer") {
                  navigate('/app/profile/about');
                } else if (item.text === "Support Us") {
                  navigate('/app/profile/support');
                } else if (item.text === "Delete Profile") {
                  navigate('/app/profile/delete');
                }
              }}
              
                key={index}
                sx={menuItemStyles}
              >
                <ListItemIcon sx={{ color: "#666", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: { xs: "14px", md: "15px" },
                      color: "#333",
                    },
                  }}
                />
                <ListItemSecondaryAction>
                  <ChevronRight sx={{ color: "#999" }} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={actionButtonsStyles}>
            <Button
            onClick={()=> setLogOutModalOpen(true)}
              variant="contained"
              startIcon={
                <i className="ti ti-logout" style={{ fontSize: "24px" }} />
              }
              sx={{
                backgroundColor: "#ff4757",
                borderRadius: "24px",
                padding: { xs: "10px", md: "12px" },
                fontSize: { xs: "13px", md: "14px" },
                fontWeight: 500,
                width: "100%",
                "&:hover": {
                  backgroundColor: "#ff3747",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
      <Outlet/>
    </>
  );
};

export default ProfileContainer;
