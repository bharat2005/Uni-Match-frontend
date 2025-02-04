
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Navbar({ value, onChange }){
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      sx={{
        borderTopLeftRadius:'12px',
        borderTopRightRadius:'12px',
        height:'60px',
        width: '640px',
        position: 'relative',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'black',
      }}
    >
      <BottomNavigationAction label="Match" sx={{color:'grey',"&.Mui-selected": { color: "white" }}} icon={<ExploreIcon />} />
      <BottomNavigationAction label="Likes" sx={{color:'grey',"&.Mui-selected": { color: "white" }}} icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Chats" sx={{color:'grey',"&.Mui-selected": { color: "white" }}} icon={<ChatIcon />} />
      <BottomNavigationAction label="Profile" sx={{color:'grey',"&.Mui-selected": { color: "white" }}} icon={<AccountCircleIcon />} />
    </BottomNavigation>

  );
};
