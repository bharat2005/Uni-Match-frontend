
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { HeartIcon, HomeIcon, ChatBubbleOvalLeftEllipsisIcon, UserCircleIcon } from '@heroicons/react/24/solid';


export default function Navbar({ value, onChange }){
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      sx={{
        borderTop:'3px solid black',
        height:'60px',
        width: '640px',
        position: 'relative',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'white',
      }}
    >
      <BottomNavigationAction label="Match" sx={{color:'grey',"&.Mui-selected": { color: "black" }}} icon={<HomeIcon style={{width:'40%'}} />} />
      <BottomNavigationAction label="Likes" sx={{color:'grey',"&.Mui-selected": { color: "black" }}} icon={<HeartIcon style={{width:'40%'}} />} />
      <BottomNavigationAction label="Chats" sx={{color:'grey',"&.Mui-selected": { color: "black" }}} icon={<ChatBubbleOvalLeftEllipsisIcon style={{width:'40%'}} />} />
      <BottomNavigationAction label="Profile" sx={{color:'grey',"&.Mui-selected": { color: "black" }}} icon={<UserCircleIcon  style={{width:'40%'}} />} />
    </BottomNavigation>

  );
};
