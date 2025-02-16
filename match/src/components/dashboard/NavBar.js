import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { HeartIcon, HomeIcon, ChatBubbleOvalLeftEllipsisIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export default function Navbar({ value, onChange, likesBool }) {
  useEffect(()=>{
    console.log('refreshed')
  },[likesBool])
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      sx={{
        borderTop: '3px solid black',
        height: '60px',
        width: '640px',
        position: 'relative',
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: 'white',
      }}
    >
      <BottomNavigationAction
        label="Match"
        sx={{ color: 'grey', "&.Mui-selected": { color: "black" } }}
        icon={<HomeIcon style={{ width: '40%' }} />}
      />


      <BottomNavigationAction
        label="Likes"
        sx={{ color: 'grey', "&.Mui-selected": { color: "black" } }}
        icon={
          <Badge
            color="error"
            variant={likesBool == 'yes' ? 'dot' : undefined} 
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              "& .MuiBadge-badge": {
                transform: 'translate(0%, 0%)', 
              },
            }}
          >
            <HeartIcon style={{ width: '40%' }} />
          </Badge>
        }
      />

      <BottomNavigationAction
        label="Chats"
        sx={{ color: 'grey', "&.Mui-selected": { color: "black" } }}
        icon={
          <Badge
          color="error"
          variant={'yes' == 'yes' ? 'dot' : undefined} 
          overlap="circular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            "& .MuiBadge-badge": {
              transform: 'translate(0%, 0%)', 
            },
          }}
        >
        <ChatBubbleOvalLeftEllipsisIcon style={{ width: '40%' }} />
        </Badge>
      }
      />

      <BottomNavigationAction
        label="Profile"
        sx={{ color: 'grey', "&.Mui-selected": { color: "black" } }}
        icon={<UserCircleIcon style={{ width: '40%' }} />}
      />
    </BottomNavigation>
  );
}
