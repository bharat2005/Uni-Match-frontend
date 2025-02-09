import React from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from "@mui/material";

export default function Chats({  onChatOpen , list}) {
  return (
    <Box
      sx={{
        height: "95%",
        bgcolor: "background.paper",
        boxShadow: 2,
        width:'500px',
        p: 2,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none", 
        },
        msOverflowStyle: "none", 
        scrollbarWidth: "none", 
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Chats
      </Typography>
      <List>
        {list.length > 0 ? (
          list.map((match, index) => {
            let bgColor = "white";
            if (match.type === "mutual") bgColor = "#d4edda"; 
            else if (match.type === "likedByYou") bgColor = "#cce5ff"; 
            else if (match.type === "likesYou") bgColor = "#f8d7da"; 

            return (
              <React.Fragment key={match.id}>
                <ListItem
                  onClick={() => onChatOpen(match)}
                  sx={{
                    bgcolor: bgColor,
                    borderRadius: "8px",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: bgColor },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={match.name} src={match.image} />
                  </ListItemAvatar>
                  <ListItemText primary={match.name} secondary={match.age + " years old"} />
                </ListItem>
                {index < list.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            No matches yet. Keep swiping!
          </Typography>
        )}
      </List>
    </Box>
  );
}