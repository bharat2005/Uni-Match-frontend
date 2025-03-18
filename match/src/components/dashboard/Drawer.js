import * as React from "react";
import { createPortal } from "react-dom";
import { Box, Paper, Typography, Chip, Avatar } from "@mui/material";

const interests = {
  Movies: {
    icon: <i className="ti ti-movie" style={{ fontSize: "24px" }} />,
    label: "Movies",
    bgcolor: "#ffe4e6", // Soft pinkish-red (matches theme)
    color: "#e11d48",
  },
  Music: {
    icon: <i className="ti ti-music" style={{ fontSize: "24px" }} />,
    label: "Music",
    bgcolor: "#f3e8ff", // Soft lavender
    color: "#7c3aed",
  },
  Sports: {
    icon: <i className="ti ti-ball-football" style={{ fontSize: "24px" }} />,
    label: "Sports",
    bgcolor: "#dcfce7", // Soft green
    color: "#15803d",
  },
  Gaming: {
    icon: <i className="ti ti-device-gamepad-2" style={{ fontSize: "24px" }} />,
    label: "Gaming",
    bgcolor: "#dbeafe", // Soft blue
    color: "#1e40af",
  },
  Travel: {
    icon: <i className="ti ti-plane" style={{ fontSize: "24px" }} />,
    label: "Travel",
    bgcolor: "#fef2f2", // Soft pinkish-white
    color: "#991b1b",
  },
  Cooking: {
    icon: <i className="ti ti-chef-hat" style={{ fontSize: "24px" }} />,
    label: "Cooking",
    bgcolor: "#fff7ed", // Soft cream
    color: "#9a3412",
  },
  Art: {
    icon: <i className="ti ti-palette" style={{ fontSize: "24px" }} />,
    label: "Art",
    bgcolor: "#fde68a", // Soft yellow
    color: "#b45309",
  },
  Reading: {
    icon: <i className="ti ti-book" style={{ fontSize: "24px" }} />,
    label: "Reading",
    bgcolor: "#f3f4f6", // Soft gray
    color: "#1f2937",
  },
  Hiking: {
    icon: <i className="ti ti-mountain" style={{ fontSize: "24px" }} />,
    label: "Hiking",
    bgcolor: "#d1fae5", // Light green
    color: "#047857",
  },
  Painting: {
    icon: <i className="ti ti-brush" style={{ fontSize: "24px" }} />,
    label: "Painting",
    bgcolor: "#e0f2fe", // Light blue
    color: "#0369a1",
  },
  Yoga: {
    icon: <i className="ti ti-yoga" style={{ fontSize: "24px" }} />,
    label: "Yoga",
    bgcolor: "#fef3c7", // Soft yellow-orange
    color: "#b45309",
  },
  Camping: {
    icon: <i className="ti ti-tent" style={{ fontSize: "24px" }} />,
    label: "Camping",
    bgcolor: "#fef9c3", // Pale yellow
    color: "#a16207",
  },
  Fishing: {
    icon: <i className="ti ti-fish" style={{ fontSize: "24px" }} />,
    label: "Fishing",
    bgcolor: "#e0f2fe", // Soft blue
    color: "#0369a1",
  },
  Dancing: {
    icon: <i className="ti ti-dance" style={{ fontSize: "24px" }} />,
    label: "Dancing",
    bgcolor: "#fde68a", // Soft yellow
    color: "#b45309",
  },
  Running: {
    icon: <i className="ti ti-run" style={{ fontSize: "24px" }} />,
    label: "Running",
    bgcolor: "#f0fdfa", // Soft teal
    color: "#0f766e",
  },
  Cycling: {
    icon: <i className="ti ti-bike" style={{ fontSize: "24px" }} />,
    label: "Cycling",
    bgcolor: "#f3f4f6", // Light gray
    color: "#1f2937",
  },
  Writing: {
    icon: <i className="ti ti-pencil" style={{ fontSize: "24px" }} />,
    label: "Writing",
    bgcolor: "#fce7f3", // Soft pink
    color: "#db2777",
  },
  Podcasts: {
    icon: <i className="ti ti-microphone" style={{ fontSize: "24px" }} />,
    label: "Podcasts",
    bgcolor: "#e0f2fe", // Soft blue
    color: "#0369a1",
  },
  Shopping: {
    icon: <i className="ti ti-shopping-cart" style={{ fontSize: "24px" }} />,
    label: "Shopping",
    bgcolor: "#fae8ff", // Light purple
    color: "#9333ea",
  },
  Fitness: {
    icon: <i className="ti ti-dumbbell-filled" style={{ fontSize: "24px" }} />,
    label: "Fitness",
    bgcolor: "#dcfce7", // Soft green
    color: "#15803d",
  },
  Coding: {
    icon: <i className="ti ti-code" style={{ fontSize: "24px" }} />,
    label: "Coding",
    bgcolor: "#dbeafe", // Soft blue
    color: "#1e40af",
  },
  Photography: {
    icon: <i className="ti ti-camera" style={{ fontSize: "24px" }} />,
    label: "Photography",
    bgcolor: "#e0f2fe", // Light blue
    color: "#0369a1",
  },
  Acting: {
    icon: <i className="ti ti-masks-theater" style={{ fontSize: "24px" }} />,
    label: "Acting",
    bgcolor: "#fef2f2", // Soft red
    color: "#991b1b",
  },
  Tech: {
    icon: <i className="ti ti-cpu" style={{ fontSize: "24px" }} />,
    label: "Tech",
    bgcolor: "#e0f2fe", // Soft blue
    color: "#0369a1",
  },
  Science: {
    icon: <i className="ti ti-atom" style={{ fontSize: "24px" }} />,
    label: "Science",
    bgcolor: "#ede9fe", // Soft purple
    color: "#7c3aed",
  },
  Swimming: {
    icon: <i className="ti ti-swimming" style={{ fontSize: "24px" }} />,
    label: "Swimming",
    bgcolor: "#dbeafe", // Soft blue
    color: "#1e40af",
  },
  Boardgames: {
    icon: <i className="ti ti-dice" style={{ fontSize: "24px" }} />,
    label: "Boardgames",
    bgcolor: "#fde68a", // Soft yellow
    color: "#b45309",
  },
  Arcade: {
    icon: <i className="ti ti-gamepad" style={{ fontSize: "24px" }} />,
    label: "Arcade",
    bgcolor: "#f3e8ff", // Light purple
    color: "#7c3aed",
  },
  Makeup: {
    icon: <i className="ti ti-brush" style={{ fontSize: "24px" }} />,
    label: "Makeup",
    bgcolor: "#fce7f3", // Soft pink
    color: "#db2777",
  },
  Gardening: {
    icon: <i className="ti ti-leaf" style={{ fontSize: "24px" }} />,
    label: "Gardening",
    bgcolor: "#dcfce7", // Soft green
    color: "#15803d",
  },
  Baking: {
    icon: <i className="ti ti-cake" style={{ fontSize: "24px" }} />,
    label: "Baking",
    bgcolor: "#fef3c7", // Soft yellow-orange
    color: "#b45309",
  },
  Skiing: {
    icon: <i className="ti ti-snowflake" style={{ fontSize: "24px" }} />,
    label: "Skiing",
    bgcolor: "#e0f2fe", // Light blue
    color: "#0369a1",
  },
  Tasting: {
    icon: <i className="ti ti-wine" style={{ fontSize: "24px" }} />,
    label: "Tasting",
    bgcolor: "#fef2f2", // Soft red-pink
    color: "#991b1b",
  },
  Roadtrip: {
    icon: <i className="ti ti-car" style={{ fontSize: "24px" }} />,
    label: "Roadtrip",
    bgcolor: "#fff7ed", // Soft cream
    color: "#9a3412",
  },
  Pets: {
    icon: <i className="ti ti-paw" style={{ fontSize: "24px" }} />,
    label: "Pets",
    bgcolor: "#fef9c3", // Pale yellow
    color: "#a16207",
  },
  Fashion: {
    icon: <i className="ti ti-shirt" style={{ fontSize: "24px" }} />,
    label: "Fashion",
    bgcolor: "#fae8ff", // Light purple
    color: "#9333ea",
  },
  Streaming: {
    icon: <i className="ti ti-device-tv" style={{ fontSize: "24px" }} />,
    label: "Streaming",
    bgcolor: "#dbeafe", // Soft blue
    color: "#1e40af",
  },
  Cruising: {
    icon: <i className="ti ti-ship" style={{ fontSize: "24px" }} />,
    label: "Cruising",
    bgcolor: "#e0f2fe", // Light blue
    color: "#0369a1",
  },
  Adventure: {
    icon: <i className="ti ti-compass" style={{ fontSize: "24px" }} />,
    label: "Adventure",
    bgcolor: "#fef3c7", // Soft yellow-orange
    color: "#b45309",
  },
  Skydiving: {
    icon: <i className="ti ti-parachute" style={{ fontSize: "24px" }} />,
    label: "Skydiving",
    bgcolor: "#fde68a", // Soft yellow
    color: "#b45309",
  },
  Racing: {
    icon: <i className="ti ti-flag-checkered" style={{ fontSize: "24px" }} />,
    label: "Racing",
    bgcolor: "#e0f2fe", // Soft blue
    color: "#0369a1",
  },
  Puzzles: {
    icon: <i className="ti ti-puzzle" style={{ fontSize: "24px" }} />,
    label: "Puzzles",
    bgcolor: "#fef9c3", // Pale yellow
    color: "#a16207",
  },
  Astronomy: {
    icon: <i className="ti ti-telescope" style={{ fontSize: "24px" }} />,
    label: "Astronomy",
    bgcolor: "#e0e7ff", // Light lavender
    color: "#4f46e5",
  },
  Singing: {
    icon: <i className="ti ti-microphone" style={{ fontSize: "24px" }} />,
    label: "Singing",
    bgcolor: "#f3e8ff", // Soft lavender
    color: "#7c3aed",
  },
  Juggling: {
    icon: <i className="ti ti-confetti" style={{ fontSize: "24px" }} />,
    label: "Juggling",
    bgcolor: "#fde68a", // Soft yellow
    color: "#b45309",
  },
  Paragliding: {
    icon: <i className="ti ti-wind" style={{ fontSize: "24px" }} />,
    label: "Paragliding",
    bgcolor: "#e0f2fe", // Soft blue
    color: "#0369a1",
  },
};

export default function Drawer({ imageClick, profile }) {
  function emoji() {
    switch (profile.reason) {
      case "Casual Dating":
        return "🎉";
      case "Short-term fun":
        return "😍";
      case "Long-term relationship":
        return "💘";
      case "New friends":
        return "👋";
      case "Study buddy":
        return "📚";
      case "Still figuring it out":
        return "🤔";
      default:
        return "";
    }
  }

  return createPortal(
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "left",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        p: 2.5,
        maxHeight: "90vh",
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 1)",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FDF3FD 25.5%)",
        transform: imageClick
          ? "translate3d(0, 0, 0)"
          : "translate3d(0, 110%, 0)",
        transition: "transform 0.3s ease-out",
        willChange: "transform",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        zIndex: 15,
      }}
    >
      <Box sx={{ mb: 1.25 }}>
        <Typography sx={{ fontSize: "28px", fontWeight: 700, mb: 1.25 }}>
          {profile.name}, {profile.age}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            icon={
              <i
                className={
                  profile.gender == "female"
                    ? "ti ti-gender-female"
                    : "ti ti-gender-male"
                }
                style={{ fontSize: "24px", color: "white" }}
              />
            }
            label={profile.gender == "female" ? "Female" : "Male"}
            sx={{
              bgcolor: profile.gender == "female" ? "#FE6BA2" : "#7270F5",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />

          <Chip
            icon={
              profile.personality == "extrovert" ? (
                <i
                  className="ti ti-sun-filled"
                  style={{ fontSize: "18px", color: "white" }}
                />
              ) : profile.personality == "introvert" ? (
                <i
                  className="ti ti-moon-filled"
                  style={{ fontSize: "18px", color: "white" }}
                />
              ) : (
                <i
                  className="ti ti-seedling-filled"
                  style={{ fontSize: "18px", color: "white" }}
                />
              )
            }
            label={
              profile.personality === "extrovert"
                ? "Extrovert"
                : profile.personality === "introvert"
                  ? "Introvert"
                  : "Ambivert"
            }
            sx={{
              bgcolor:
                profile.personality === "extrovert"
                  ? "#FF5C5C"
                  : profile.personality === "introvert"
                    ? "#8A2BE2"
                    : "#32CD32",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />

          <Chip
            icon={
              <i
                className="ti ti-user-filled"
                style={{ fontSize: "18px", color: "white" }}
              />
            }
            label={profile.reg_no}
            sx={{
              bgcolor: "#ffc107",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />

          {profile.reg_no == "12413923" && (
            <Chip
              icon={
                <i
                  className="ti ti-settings"
                  style={{ fontSize: "18px", color: "white" }}
                />
              }
              label="Developer"
              sx={{
                bgcolor: "#6A0DAD  ",
                color: "white",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          )}
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: "#666", my: 1.25 }}>
        {emoji()}
        {profile.reason}
      </Typography>

      <Box sx={{ mt: 2, backgroundColor: "#FFFFFF", borderRadius: "24px" }}>
        <Typography sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: "20px" }}>
          About
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            overflowX: "auto",
            p: 2,
            pt: 0,
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {profile.bio}
        </Box>
      </Box>

      <Box sx={{ mt: 2, backgroundColor: "#FFFFFF", borderRadius: "24px" }}>
        <Typography sx={{ p: 1, fontWeight: 520, pl: 2, fontSize: "20px" }}>
          Interests
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            overflowX: "auto",
            p: 2,
            pt: 0,

            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            whiteSpace: "nowrap",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {profile.interests.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: interests[item].bgcolor,
                  color: interests[item].color,
                  fontSize: "26px",
                }}
              >
                {interests[item].icon}
              </Avatar>
              <Typography variant="caption" sx={{ color: "#666" }}>
                {interests[item].label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>,
    document.body,
  );
}
