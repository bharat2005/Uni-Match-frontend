"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import Chatoo from "./Chatoo";
import ImagePart from "./ImagePart";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from "./Drawer";
import SmallLoading from "../login/SmallLoading";

const profile = {
  reg_no: "12413928",
  reason: "Long-term relationship",
  age: 20,
  name: "Jisoo",
  personality: "extrovert",
  images: ["/2.jpg", "/3.jpg", "/1.jpg", null, null],
  bio: "Im the solo developer of this whole Uni-Match platform...😎",
  interests: [
    "Gardening",
    "Paragliding",
    "Puzzles",
    "Juggling",
    "Art",
    "Juggling",
  ],
};

const chatData = [
  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },

  {
    name: "Bharat",
    message: "hi",
    id: 0,
    count: 8,
    time: "16:04",
    image: "/4.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 1,
    count: 8,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 2,
    count: 8,
    time: "16:04",
    image: "/6.jpg",
  },
  {
    name: "Bharat",
    message: "hi",
    id: 3,
    count: 8,
    time: "16:04",
    image: "/7.jpg",
  },
];
export default function ChatInterface() {
  const navigate = useNavigate();
  const [imageClick, setImageClick] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const list = profile.images.filter((item) => item != null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1,
    );

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1,
    );
    setImageLoaded(false);
  };

  return (
    <>
      {imageClick && (
        <ImagePart
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
          list={list}
          currentImageIndex={currentImageIndex}
          setImageClick={setImageClick}
          prevImage={prevImage}
          nextImage={nextImage}
        />
      )}

      <Container
        component="main"
        sx={{
          background:
            "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
          padding: {
            xs: "12px",
            sm: "14px",
            md: "18px",
          },
        }}
      >
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              fontSize: { xs: "24px", sm: "28px" },
              fontWeight: 600,
              color: "#333",
              letterSpacing: "0.5px",
            }}
          >
            Chats
          </Typography>
        </Box>

        {/* Fix the height here */}
        <Container
          component="section"
          sx={{
            maxWidth: {
              xs: "100%",
              md: "600px",
            },
            height: "100vh",
            margin: "0 auto",

            borderRadius: "20px",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <List
            sx={{
              height: `calc(100vh - 42px - 46px - 16px)`,
              overflowY: "auto",
              background: "white",
              borderRadius: "20px",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {chatData.map((chat, index) => (
              <ListItem
                onClick={() => navigate(`/app/${chat.id}`)}
                key={index}
                sx={{
                  padding: {
                    xs: "10px",
                    sm: "13px",
                  },
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setImageClick(true);
                    }}
                    src={chat.image}
                    alt={`${chat.name}'s profile`}
                    sx={{
                      width: {
                        xs: "55px",
                        sm: "65px",
                      },
                      height: {
                        xs: "55px",
                        sm: "65px",
                      },
                      marginRight: "15px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "20px",
                        },
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: "0px",
                      }}
                    >
                      {chat.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "16px",
                        },
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      {chat.message}
                    </Typography>
                  }
                />
                {chat.count > 0 && (
                  <Badge
                    badgeContent={chat.count}
                    sx={{
                      position: "absolute",
                      right: "6%",
                      marginTop: 2,
                      "& .MuiBadge-badge": {
                        backgroundColor: "#FE6BA2",
                        color: "white",
                        fontSize: {
                          xs: "11px",
                          sm: "12px",
                        },
                        minWidth: {
                          xs: "20px",
                          sm: "24px",
                        },
                        height: {
                          xs: "20px",
                          sm: "24px",
                        },
                        borderRadius: "50%",
                      },
                    }}
                  />
                )}
                <Typography
                  component="time"
                  sx={{
                    color: "#9ca3af",
                    fontSize: {
                      xs: "11px",
                      sm: "12px",
                    },
                    position: "absolute",
                    right: "15px",
                    top: "15px",
                  }}
                >
                  {chat.time}
                </Typography>
              </ListItem>
            ))}
            <Box
              sx={{
                height: "40px", // Same as or slightly more than the navbar height
                backgroundColor: "transparent", // Invisible, just for spacing
              }}
            />
          </List>
        </Container>
      </Container>

      <Drawer imageClick={imageClick} profile={profile} key={profile.reg_no} />
    </>
  );
}
