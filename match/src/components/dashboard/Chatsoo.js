"use client";
import React, {useState} from "react";
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
  IconButton
} from "@mui/material";
import Chatoo from './Chatoo';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Drawer from './Drawer';
import SmallLoading from '../login/SmallLoading';

const profile =   { reg_no: '12413928', reason: 'Long-term relationship', age: 23, name: 'Bharat',personality:'extrovert', images: [null, '/10.avif', '/4.avif', '/5.jpg', null], bio:'Im the solo developer of this whole Uni-Match platform...😎', interests:["Gardening", "Paragliding","Puzzles", "Astronomy", "Juggling",   "Art"  ] };


const chatData = [
  {
    name: "Bharat",
    message: "hi",
    count: 8,
    time: "16:04",
    image: "/4.avif",
  },
  {
    name: "Amit",
    message: "good bye",
    count: 1,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Rajesh",
    message: "what are you doing?",
    count: 1,
    time: "16:04",
    image: "/6.avif",
  },
  {
    name: "Tanmay",
    message: "I love you!",
    count: 1,
    time: "16:04",
    image: "/7.avif",
  },
     {
    name: "Rakesh",
    message: "baby!!!!",
    count: 1,
    time: "16:04",
    image: "/8.webp",
  },
   {
    name: "Samay",
    message: "....",
    count: 1,
    time: "16:04",
    image: "/9.jpg",
  },
    {
    name: "Nikhil",
    message: "fewwww.....",
    count: 1,
    time: "16:04",
    image: "/10.avif",
  },
  {
    name: "Rakesh",
    message: "baby!!!!",
    count: 1,
    time: "16:04",
    image: "/8.webp",
  },
   {
    name: "Samay",
    message: "....",
    count: 1,
    time: "16:04",
    image: "/9.jpg",
  },
    {
    name: "Nikhil",
    message: "fewwww.....",
    count: 1,
    time: "16:04",
    image: "/10.avif",
  },
  {
    name: "Amit",
    message: "good bye",
    count: 1,
    time: "16:04",
    image: "/5.jpg",
  },
  {
    name: "Rajesh",
    message: "what are you doing?",
    count: 1,
    time: "16:04",
    image: "/6.avif",
  },
  {
    name: "Tanmay",
    message: "I love you!",
    count: 1,
    time: "16:04",
    image: "/7.avif",
  },
     {
    name: "Rakesh",
    message: "baby!!!!",
    count: 1,
    time: "16:04",
    image: "/8.webp",
  },
   {
    name: "Samay",
    message: "....",
    count: 1,
    time: "16:04",
    image: "/9.jpg",
  },
    {
    name: "Nikhil",
    message: "fewwww.....",
    count: 1,
    time: "16:04",
    image: "/10.avif",
  },
  {
    name: "Rakesh",
    message: "baby!!!!",
    count: 1,
    time: "16:04",
    image: "/8.webp",
  },
   {
    name: "Samay",
    message: "....",
    count: 1,
    time: "16:04",
    image: "/9.jpg",
  },
    {
    name: "Nikhil",
    message: "fewwww.....",
    count: 1,
    time: "16:04",
    image: "/10.avif",
  },
  
];
export default function ChatInterface(){
   const [chatt, setChatt] = useState(false)

       const [imageClick, setImageClick] = useState(false);
       const [currentImageIndex, setCurrentImageIndex] = useState(0);
       const [imageLoaded, setImageLoaded] = useState(false);
       const list = profile.images.filter(item => item != null);

   const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === list.length - 1 ? 0 : prevIndex + 1
    );

    setImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? list.length - 1 : prevIndex - 1
    );
    setImageLoaded(false);
  };

  if (chatt) {
    return <Chatoo setChatt={setChatt} />
  }
  return (<>
 {imageClick &&
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: imageLoaded
                ? 'translate(-50%, 0) scale(1)'
                : 'translate(-50%, 100%) scale(0.9)',
              width: '100vw',
              height: '60vh',
              zIndex: 5,
              background: imageLoaded 
              ? `url(${list[currentImageIndex]})`
              : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.1s ease, transform 0.3s ease',
            }}
          >
           {!imageLoaded && (
            <SmallLoading/>
            )}
              <img  
              src={list[currentImageIndex]}
              alt="profile"
              style={{
                display: 'none', 
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)} // Fallback if the image fails to load
            />

            {/* Left Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                transform: 'translateY(-50%)',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Close Button */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: '#fff',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setImageClick(false);
              }}
            >
              <i className="ti ti-arrow-left" style={{ fontSize: "24px" }}></i>
            </IconButton>

            {/* ✅ Dots Indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px',
              }}
            >
              {list.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "48px",
                    height: "4px",
                    borderRadius: "15%",
                    backgroundColor: index === currentImageIndex ? '#fff' : '#888',
                    opacity: index === currentImageIndex ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        }

 
    <Container
      component="main"
      sx={{
        background: "linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F5F5F5 26%)",
        padding: {
          xs: "10px",
          sm: "15px",
          md: "20px",
        },
      }}
    >
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
            maxHeight: "75vh", 
            overflowY: "auto",
            background: "white",
            borderRadius:'20px',
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {chatData.map((chat, index) => (
            <ListItem
            onClick={()=>{setChatt(true)}}
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
                onClick={(e)=> {e.stopPropagation();e.preventDefault();setImageClick(true)}}
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
                    position:'absolute',
                    right:'6%',
                    marginTop:2,
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
        </List>
      </Container>
    </Container>

     <Drawer imageClick={imageClick}  profile={profile} key={profile.reg_no} />
 </> );
};
