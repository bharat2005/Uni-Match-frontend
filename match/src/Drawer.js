"use client";
import * as React from "react";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Avatar,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Settings,
  School,
  Work,
  Person,
  DirectionsCar,
  Home,
  CheckCircle,
} from "@mui/icons-material";

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans SC", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(5px)", // ✅ Reduced blur to prevent excessive blurriness
        },
      },
    },
  },
});

function AppContainer() {
  const [startY, setStartY] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY < -50 && !isDrawerOpen) {
      setIsDrawerOpen(true);
    } else if (deltaY > 50 && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  const handleTouchEnd = () => {
    setStartY(0);
  };

  const verificationItems = [
    { icon: <School />, label: "学历", bgcolor: "#dcfce7", color: "#166534" },
    { icon: <Work />, label: "工作", bgcolor: "#f3e8ff", color: "#6b21a8" },
    { icon: <Person />, label: "单身", bgcolor: "#dbeafe", color: "#1e40af" },
    { icon: <DirectionsCar />, label: "车产", bgcolor: "#fff7ed", color: "#9a3412" },
    { icon: <Home />, label: "房产", bgcolor: "#fef2f2", color: "#991b1b" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #fce7f3, #e0f2fe)",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2.5,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              北京
            </Typography>
            <KeyboardArrowDown />
          </Box>
          <IconButton>
            <Settings />
          </IconButton>
        </Box>

        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            p: 2.5,
            maxHeight: "90vh",
            overflowY: "auto",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            transform: isDrawerOpen ? "translate3d(0, 0, 0)" : "translate3d(0, 98%, 0)",
            transition: "transform 0.3s ease-out",
            willChange: "transform",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Box sx={{ mb: 1.25 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.25 }}>
              Bharat, 19
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="编号:9527" sx={{ bgcolor: "#fce7f3", color: "#be185d", borderRadius: "15px" }} />
              <Chip label="高级VIP" sx={{ bgcolor: "#fef3c7", color: "#92400e", borderRadius: "15px" }} />
              <Chip icon={<CheckCircle sx={{ color: "#1e40af !important" }} />} label="已实名" sx={{ bgcolor: "#dbeafe", color: "#1e40af", borderRadius: "15px" }} />
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: "#666", my: 1.25 }}>
            93年·重庆·本科·主持人
          </Typography>

          <Typography
            variant="body2"
            sx={{
              bgcolor: "rgba(240, 240, 240, 0.5)",
              p: 1.875,
              borderRadius: 1.5,
              lineHeight: 1.5,
              color: "#333",
            }}
          >
            本人性格热情开朗，待人友好，为人诚实谦虚。工作勤奋，认真
          </Typography>

          <Box sx={{ mt: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.875 }}>
              我的认证
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                overflowX: "auto",
                p: 1.875,
                bgcolor: "rgba(240, 240, 240, 0.5)",
                borderRadius: 1.5,
                "&::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                whiteSpace: "nowrap",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
              }}
            >
              {verificationItems.map((item, index) => (
                <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ width: 50, height: 50, bgcolor: item.bgcolor, color: item.color }}>
                    {item.icon}
                  </Avatar>
                  <Typography variant="caption" sx={{ color: "#666" }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default AppContainer;
