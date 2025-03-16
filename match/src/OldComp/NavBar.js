import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Badge } from "@mui/material";
import {
  HeartIcon,
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Navbar({ value, onChange, likesNoti, matchesNoti }) {
  console.log(likesNoti.length);
  return (
    <BottomNavigation
      value={value}
      onChange={onChange}
      showLabels
      sx={{
        borderTop: "1px solid #fd7e14",
        height: "60px",
        width: "640px",
        position: "relative",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <BottomNavigationAction
        label="Match"
        sx={{ color: "grey", "&.Mui-selected": { color: "black" } }}
        icon={<HomeIcon style={{ width: "40%" }} />}
      />

      <BottomNavigationAction
        label="Likes"
        sx={{ color: "grey", "&.Mui-selected": { color: "black" } }}
        icon={
          <Badge
            badgeContent={likesNoti.length > 0 ? likesNoti.length : null}
            color="error"
            sx={{ display: "flex", justifyContent: "center", width: "40%" }}
          >
            <HeartIcon style={{ width: "100%" }} />
          </Badge>
        }
      />

      <BottomNavigationAction
        label="Chats"
        sx={{ color: "grey", "&.Mui-selected": { color: "black" } }}
        icon={
          <Badge
            badgeContent={matchesNoti.length > 0 ? matchesNoti.length : null}
            color="error"
            sx={{ display: "flex", justifyContent: "center", width: "40%" }}
          >
            <ChatBubbleOvalLeftEllipsisIcon style={{ width: "100%" }} />
          </Badge>
        }
      />

      <BottomNavigationAction
        label="Profile"
        sx={{ color: "grey", "&.Mui-selected": { color: "black" } }}
        icon={<UserCircleIcon style={{ width: "40%" }} />}
      />
    </BottomNavigation>
  );
}
