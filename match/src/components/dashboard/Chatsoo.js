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
} from "@mui/material";
import Chatoo from './Chatoo';
import ProfileModal from './ProfileModal';

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
  
];
export default function ChatInterface(){
   const [chatt, setChatt] = useState(false)
   const [open, setOpen] = useState(false)


  if (chatt) {
    return <Chatoo setChatt={setChatt} />
  }
  return (<>

      <ProfileModal open={open} onClose={()=> setOpen(false)} profile={profile}/>
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
          height: "80vh", 
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
                onClick={(e)=> {e.stopPropagation();e.preventDefault();setOpen(profile)}}
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
 </> );
};
