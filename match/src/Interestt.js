"use client";
import * as React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

function LocationSelector() {
  const [selectedLocations, setSelectedLocations] = React.useState([]);

  const handleLocationSelect = (location) => {
    setSelectedLocations((prev) => {
      if (prev.includes(location)) {
        return prev.filter((loc) => loc !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ffe6e6, #e6f0ff)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: '"Noto Sans SC", sans-serif',
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <Button
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          minWidth: "auto",
          padding: 0,
          color: "#000",
        }}
      >
        <ChevronLeft sx={{ fontSize: "24px" }} />
      </Button>

      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: 500,
          margin: "40px 0 30px",
          fontFamily: "inherit",
        }}
      >
        你的工作地是？
      </Typography>

      <Container sx={{ padding: "0 20px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: { xs: "10px", sm: "15px" },
            padding: "0 10px",
            maxHeight: "calc(100vh - 250px)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {[
            "北京",
            "天津",
            "河北",
            "山西",
            "内蒙古",
            "辽宁",
            "吉林",
            "黑龙江",
            "上海",
            "江苏",
            "浙江",
            "安徽",
            "福建",
            "江西",
            "山东",
            "河南",
            "湖北",
            "湖南",
            "广东",
            "广西",
            "海南",
            "重庆",
            "四川",
            "贵州",
            "云南",
            "西藏",
            "陕西",
            "甘肃",
            "青海",
            "宁夏",
            "新疆",
          ].map((location) => (
            <Button
              key={location}
              onClick={() => handleLocationSelect(location)}
              sx={{
                background: selectedLocations.includes(location)
                  ? "#ff69b4"
                  : "white",
                borderRadius: "20px",
                padding: { xs: "10px", sm: "12px" },
                textAlign: "center",
                fontSize: { xs: "14px", sm: "16px" },
                color: selectedLocations.includes(location) ? "white" : "black",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: selectedLocations.includes(location)
                    ? "#ff69b4"
                    : "#f5f5f5",
                },
                fontFamily: "inherit",
                boxShadow: selectedLocations.includes(location)
                  ? "0 2px 4px rgba(255, 105, 180, 0.3)"
                  : "none",
                transform: selectedLocations.includes(location)
                  ? "scale(1.02)"
                  : "scale(1)",
              }}
            >
              {location}
            </Button>
          ))}
        </Box>
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            marginBottom: "10px",
            fontFamily: "inherit",
          }}
        >
          基础资料(6/14)
        </Typography>

        <Box
          sx={{
            height: "4px",
            borderRadius: "2px",
            marginBottom: "15px",
            background: "#f0f0f0",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "43%",
              height: "100%",
              borderRadius: "2px",
              background: "#ff69b4",
              position: "absolute",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#666",
            fontFamily: "inherit",
          }}
        >
          为打造100%真实的交友平台，请如实填写资料，不真实的资料审核时将会被拒绝。
        </Typography>
      </Box>
    </Box>
  );
}

export default LocationSelector;
