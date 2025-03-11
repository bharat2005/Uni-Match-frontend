import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { Check, Close, Settings } from "@mui/icons-material";

const SearchContainer = () => {
  const profiles = [
    {
      id: 1,
      name: "若有所思",
      image: "https://placehold.co/400x400/f5f5f5/f5f5f5",
      isVerified: true,
      details: "3年 · 重庆 · 大专 · 销售",
    },
    {
      id: 2,
      name: "白马城阳",
      image: "https://placehold.co/400x400/f8f8f8/f8f8f8",
      details: "97年 ·圳 · 本科 · 糕点师",
    },
    {
      id: 3,
      name: "白马城阳",
      image: "https://placehold.co/400x400/f8f8f8/f8f8f8",
      details: "97年 · 广东深圳 · 本科 ",
    },
    {
      id: 4,
      name: "若有所思",
      image: "https://placehold.co/400x400/f5f5f5/f5f5f5",
      isVerified: true,
      details: "93年 ·庆 · 大专 · 销售",
    },
  ];

  const VerifiedBadge = () => (
    <Box
      sx={{
        color: "#4f46e5",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 500,
        bgcolor: "#e0e7ff",
        display: "inline-block",
      }}
    >
      已实名
    </Box>
  );

  const ActionButtons = () => (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          gap: "8px",
          zIndex: 10,
          "@media (max-width: 640px)": {
            left: "25px",
            top: "103px",
          },
        }}
      >
        {["accept", "reject"].map((type) => (
          <Button
            key={type}
            sx={{
              width: "44px",
              height: "44px",
              minWidth: "44px",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.15)",
              background:
                type === "accept"
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "blur(8px)",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              "&:hover": {
                background:
                  type === "accept"
                    ? "linear-gradient(135deg, #16a34a, #22c55e)"
                    : "linear-gradient(135deg, #dc2626, #ef4444)",
              },
            }}
          >
            {type === "accept" ? <Check /> : <Close />}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "15%",
          display: "flex",
          gap: "8px",
          padding: "0 8px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent)",
          opacity: 0,
          transition: "opacity 0.2s ease",
          "@media (max-width: 640px)": {
            display: "none",
          },
        }}
      >
        {["like", "dismiss"].map((type) => (
          <Button
            key={type}
            sx={{
              flex: 1,
              border: "none",
              borderRadius: "20px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              bgcolor: type === "like" ? "#22c55e" : "#ef4444",
              "&:hover": {
                bgcolor: type === "like" ? "#16a34a" : "#dc2626",
              },
            }}
          >
            {type === "like" ? null : <Close />}
          </Button>
        ))}
      </Box>
    </Box>
  );

  const ProfileCard = ({ image, name, isVerified, details }) => (
    <Box
      sx={{
        borderRadius: "12px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        "@media (max-width: 640px)": {
          padding: "8px",
          gap: "6px",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={image}
          alt={`${name}'s profile`}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
        <ActionButtons />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#111827",
            margin: 0,
          }}
        >
          {name}
        </Typography>
        {isVerified && <VerifiedBadge />}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          {details}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fce7f3, #dbeafe)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        "@media (max-width: 640px)": {
          paddingBottom: "100px",
          marginBottom: "-5px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "20px", sm: "24px" },
            fontWeight: 600,
            color: "#111827",
            margin: 0,
          }}
        >
          搜索结果
        </Typography>
        <Button
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            minWidth: "auto",
            p: 0,
            color: "#4b5563",
          }}
        >
          <Settings sx={{ fontSize: "24px" }} />
        </Button>
      </Box>

      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {profiles.map((profile) => (
          <Grid item xs={6} key={profile.id}>
            <ProfileCard {...profile} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "15px",
          gap: "15px",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          bgcolor: "rgba(255, 255, 255, 0.8)",
        }}
      >
      </Box>
    </Box>
  );
};

export default SearchContainer;
