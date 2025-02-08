import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Match from './dashboard/Match';
import Navbar from './dashboard/NavBar';
import Profile from './dashboard/Profile';
import Likes from './dashboard/Likes';
import Chats from './dashboard/Chats'

let list =[
  {name:'Sammy', id: 0, age:'19', image:'/me.jpg',type:'mutual'},
  {name:'Mandy', id: 1, age:'18', image:'/me2.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likesYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'mutual'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'mutual'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'},
  {name:'Linda', id: 2, age:'20', image:'/me3.jpg',type:'likedByYou'}
]

export default function Dashboard(){
  const [value, setValue] = useState(0);

  const renderContent = () => {
    switch (value) {
      case 0:
        return <Match />;
      case 1:
        return <Likes matches={list}  onChatOpen={()=>true}/>;
      case 2:
        return <Chats />;
      case 3:
        return <Profile />;
      default:
        return <Match/>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#ffbf00",
        
      }}
    >
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          width: "100%",
          height: "90%",
          position: "relative",
        }}
      >
        {renderContent()}
      </Box>

      <Navbar value={value} onChange={(event, newValue) => setValue(newValue)} />
    </Box>
  );
};
