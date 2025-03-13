import React from "react";
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

const ProfileContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:640px)");
  const isTablet = useMediaQuery("(max-width:991px)");

  const containerStyles = {
    background: "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
    fontFamily: '"Inter", sans-serif',
    padding: {
      xs: "0 12px",
      sm: "0 16px",
      md: "0 20px",
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
    margin: "16px 0",
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
    { icon:  <i className="ti ti-edit" style={{ fontSize: "24px", color:'black' }} />, text: "Edit Profile" },
    { icon: <i className="ti ti-share" style={{ fontSize: "24px",color:'black' }} />, text: "Share" },
    { icon: <i className="ti ti-info-circle" style={{ fontSize: "24px",color:'black' }} />, text: "About Developer" },
    { icon:  <i className="ti ti-heart-handshake" style={{ fontSize: "24px", color:'black' }} />, text: "Support Us" },

  ];

  return (
    <Box sx={containerStyles}>
      <Box sx={profileHeaderStyles}>
        <Avatar
          src="/5.jpg"
          alt="Profile"
          sx={{
            width: { xs: "80px", md: "80px" },
            height: { xs: "80px", md: "80px" },
            marginBottom: "10px",
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
          Bharat
        </Typography>
        <Box
          sx={{
            backgroundColor:"#ffc107",
            padding: "6px 10px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            fontSize:'14px',
          }}
        ><i className="ti ti-id" style={{ fontSize: "20px", marginRight:'2px' }} />
          12413923
        </Box>
      </Box>

      <Box sx={menuListStyles}>
        <List disablePadding>
          {menuItems.map((item, index) => (
            <ListItem key={index} sx={menuItemStyles}>
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
            variant="contained"
            startIcon={<i className="ti ti-logout" style={{ fontSize: "24px" }} />}
            sx={{
              backgroundColor: "#ff4757",
              borderRadius: "12px",
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
          <Button
            variant="outlined"
            startIcon={<i className="ti ti-trash" style={{ fontSize: "24px" }} />}
            sx={{
              backgroundColor: "#f8f9fa",
              color: "#666",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: { xs: "10px", md: "12px" },
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 500,
              width: "100%",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "#d0d0d0",
              },
            }}
          >
            Delete Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileContainer;
